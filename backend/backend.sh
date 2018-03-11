#!/bin/bash

# https://blog.codeship.com/using-swarm-with-calico-on-docker-machine/
# https://blog.scottlowe.org/2015/08/04/using-vagrant-docker-machine-together/
# http://blog.mbrt.it/2017-10-01-demystifying-container-networking/

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
    --engine-opt="cluster-store=etcd://192.168.99.101:2379" \
    --engine-opt="iptables=false"\
    ${2}

  docker-machine ssh ${2} sudo usermod -aG docker vagrant
  docker-machine ssh ${2} sudo iptables -F
  docker-machine ssh ${2} sudo iptables -P FORWARD ACCEPT
}

function create_calico_node
{
  docker-machine ssh ${1} ETCD_ENDPOINTS=http://192.168.99.101:2379 \
    sudo calicoctl node run \
    --node-image=quay.io/calico/node:v2.6.8 \
    --no-default-ippools 
}

case "$1" in
  "create")
    vagrant plugin install vagrant-vbguest
    vagrant box update
    vagrant up

    create_docker_machine 192.168.99.101 npg-01
    create_docker_machine 192.168.99.102 npg-02

    create_calico_node npg-01
    create_calico_node npg-02

    docker-machine ssh npg-01 ETCD_ENDPOINTS=http://192.168.99.101:2379 calicoctl apply -f /vagrant/policy.yml
    ;;

  "destroy")
    docker-machine rm -y npg-01
    docker-machine rm -y npg-02
    vagrant destroy -f
    ;;

  "status")
    docker-machine ls
    ;;

  "t1")
    docker-machine ssh npg-01 /vagrant/test/test1.sh
    docker-machine ssh npg-01 /vagrant/test/test2.sh
    ;;

  "t2")
    docker-machine ssh npg-02 /vagrant/test/test2.sh
    ;;

  "t3")
    docker-machine ssh npg-01 /vagrant/test/test3.sh
    ;;

  "t4")
    docker-machine ssh npg-01 /vagrant/test/test4.sh
    ;;

  "t5")
    docker-machine ssh npg-01 /vagrant/test/test5.sh
    ;;

  *)
    echo "usage: $0 [ create | destroy | status ]"
    ;;
esac
