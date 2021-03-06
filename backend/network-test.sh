#!/bin/bash

function get_test_configuration
{
  eval $(docker-machine env npg-01)
  SUBNET1=`docker network inspect net1 -f "{{ range .IPAM.Config }}{{ .Subnet }}{{end}}"`
  SUBNET2=`docker network inspect net2 -f "{{ range .IPAM.Config }}{{ .Subnet }}{{end}}"`
  IP1=`docker inspect n1 -f "{{ .NetworkSettings.Networks.net1.IPAddress }}"`
  IP3_1=`docker inspect n3 -f "{{ .NetworkSettings.Networks.net1.IPAddress }}"`
  IP3_2=`docker inspect n3 -f "{{ .NetworkSettings.Networks.net2.IPAddress }}"`
  IP4=`docker inspect n4 -f "{{ .NetworkSettings.Networks.net2.IPAddress }}"`
  IPs=`docker service inspect s1 -f "{{ range .Endpoint.VirtualIPs }}{{ .Addr }}{{ end }}" | cut -d'/' -f1`
  eval $(docker-machine env npg-02)
  IP2=`docker inspect n2 -f "{{ .NetworkSettings.Networks.net1.IPAddress }}"`
  eval $(docker-machine env -u)
}

case "$1" in

  "create")
    echo "List swarm nodes"
    docker-machine ssh npg-01 docker node ls
    echo
    echo "Create networks"
    docker-machine ssh npg-01 docker network create -d overlay --attachable net1  # overlay
    docker-machine ssh npg-01 docker network create net2                          # bridge
    echo
    echo "List networks"
    docker-machine ssh npg-01 docker network ls -f name=net
    echo
    echo "Create service"
    docker-machine ssh npg-01 docker service create --network net1 --name s1 --replicas 2 busybox sleep 1d
    echo
    echo "List services"
    docker-machine ssh npg-01 docker service ls
    echo
    echo "Create containers"
    # NET_ADMIN to allow changing net settings inside the container
    docker-machine ssh npg-01 docker run -tid --rm --net net1 --name n1 --cap-add NET_ADMIN busybox
    docker-machine ssh npg-02 docker run -tid --rm --name n2 busybox
    docker-machine ssh npg-01 docker run -tid --rm --net net2 --name n3 busybox
    docker-machine ssh npg-01 docker run -tid --rm --net net2 --name n4 --cap-add NET_ADMIN busybox
    echo
    echo "Attach containers"
    docker-machine ssh npg-02 docker network connect net1 n2
    docker-machine ssh npg-01 docker network connect net1 n3
    echo
    echo "Add static routes"
    get_test_configuration
    docker-machine ssh npg-01 docker exec n4 ip r add ${SUBNET1} via ${IP3_2}
    docker-machine ssh npg-01 docker exec n1 ip r add ${SUBNET2} via ${IP3_1}
    echo
    ;;

  "show")
    get_test_configuration
    echo
    echo "net1: $SUBNET1"
    echo "net2: $SUBNET2"
    echo "s1: $IPs"
    echo "n1: $IP1"
    echo "n2: $IP2"
    echo "n3: $IP3_1 $IP3_2"
    echo "n4: $IP4"
    echo
    ;;

  "ping")
    get_test_configuration
    docker-machine ssh npg-01 docker exec n1 ping -c 3 $IPs
    docker-machine ssh npg-01 docker exec n1 ping -c 3 $IP2
    docker-machine ssh npg-01 docker exec n1 ping -c 3 $IP3_1
    docker-machine ssh npg-01 docker exec n1 ping -c 3 $IP3_2
    docker-machine ssh npg-01 docker exec n1 ping -c 3 $IP4
    docker-machine ssh npg-01 docker exec n4 ping -c 3 $IP3_2
    docker-machine ssh npg-01 docker exec n4 ping -c 3 $IP1
    docker-machine ssh npg-02 docker exec n2 ping -c 3 $IP1
    ;;
  
  "destroy")
    echo
    echo "Remove service"
    docker-machine ssh npg-01 docker service rm s1
    echo
    echo "Remove containers"
    docker-machine ssh npg-01 docker stop -t 0 n1
    docker-machine ssh npg-02 docker stop -t 0 n2
    docker-machine ssh npg-01 docker stop -t 0 n3 n4
    echo
    echo "Remove networks"
    docker-machine ssh npg-01 docker network rm net1 net2
    echo
    echo "Check overlay network"
    while true; do
      CHECK=`docker-machine ssh npg-01 docker network ls -f name=net1 | tail -n +2`
      echo "Waiting for net1 to disappear"
      if [ "$CHECK" ]; then
        sleep 1
      else
        break
      fi
    done
    ;;

  *)
    echo "usage: $0 [ create | show | ping | destroy ]"
    ;;

esac
