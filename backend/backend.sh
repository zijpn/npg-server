#!/bin/bash

function create_docker_machine
{
  PUBLIC_KEY="$HOME/.vagrant.d/insecure_private_key.pub"
  PRIVATE_KEY="$HOME/.vagrant.d/insecure_private_key"
  VAGRANT_INSECURE_PUBLIC_KEY_URL="https://raw.githubusercontent.com/hashicorp/vagrant/master/keys/vagrant.pub"

  if [ ! -e ${PUBLIC_KEY} ]; then
    curl --silent ${VAGRANT_INSECURE_PUBLIC_KEY_URL} -o ${PUBLIC_KEY}
  fi

  # engine options can still be changed on the machine itself:
  #   sudo vim /etc/systemd/system/docker.service.d/10-machine.conf
  #   sudo systemctl daemon-reload
  #   sudo systemctl restart docker.service
  docker-machine create -d generic \
    --generic-ip-address ${1} \
    --generic-ssh-user vagrant \
    --generic-ssh-key ${PRIVATE_KEY} \
    --engine-opt="iptables=false"\
    ${2}

  docker-machine ssh ${2} sudo usermod -aG docker vagrant
  docker-machine ssh ${2} sudo iptables -F
  docker-machine ssh ${2} sudo iptables -P FORWARD ACCEPT
}

function create_docker_swarm
{
  docker-machine ssh npg-01 docker swarm init --advertise-addr 192.168.99.101
  TOKEN=`docker-machine ssh npg-01 docker swarm join-token worker -q`
  docker-machine ssh npg-02 docker swarm join --token ${TOKEN} 192.168.99.101:2377
}

case "$1" in
  "create")
    vagrant plugin install vagrant-vbguest
    vagrant box update
    vagrant up

    create_docker_machine 192.168.99.101 npg-01
    create_docker_machine 192.168.99.102 npg-02

    create_docker_swarm
    ;;

  "destroy")
    docker-machine rm -y npg-01 npg-02 2>/dev/null
    vagrant destroy -f
    ;;

  "status")
    docker-machine ls
    ;;

  "test")
    # multi-host networking with native overlay driver
    # https://www.youtube.com/watch?v=nGSNULpHHZc
    echo "List swarm nodes"
    docker-machine ssh npg-01 docker node ls
    echo
    echo "Create overlay network"
    docker-machine ssh npg-01 docker network create -d overlay --attachable net1
    echo
    echo "List overlay network"
    docker-machine ssh npg-01 docker network ls -f name=net1
    echo
    echo "Attach container on npg-01"
    docker-machine ssh npg-01 docker run -tid --rm --net net1 --name n1 busybox
    echo
    echo "Attach container on npg-02"
    docker-machine ssh npg-02 docker run -tid --rm --net net1 --name n2 busybox
    echo
    echo "Ping test"
    IP1=`docker-machine ssh npg-01 docker inspect n1 -f \"{{ .NetworkSettings.Networks.net1.IPAddress }}\"`
    IP2=`docker-machine ssh npg-02 docker inspect n2 -f \"{{ .NetworkSettings.Networks.net1.IPAddress }}\"`
    docker-machine ssh npg-01 docker exec n1 ping -c 3 $IP2
    docker-machine ssh npg-02 docker exec n2 ping -c 3 $IP1
    echo
    echo "Remove containers"
    docker-machine ssh npg-01 docker stop n1 -t 0
    docker-machine ssh npg-02 docker stop n2 -t 0
    echo
    echo "Remove overlay network"
    docker-machine ssh npg-01 docker network rm net1
    ;;

  *)
    echo "usage: $0 [ create | destroy | status | test ]"
    ;;
esac
