#!/bin/bash

DOCKER_VERSION="17.12.1"

function create_machine
{
  # engine options can still be changed on the machine itself:
  #   sudo vim /etc/systemd/system/docker.service.d/10-machine.conf
  #   sudo systemctl daemon-reload
  #   sudo systemctl restart docker.service
  docker-machine create -d generic \
    --generic-ip-address ${1} \
    --generic-ssh-user vagrant \
    --generic-ssh-key keys/npg \
    --engine-install-url="https://releases.rancher.com/install-docker/${DOCKER_VERSION}.sh" \
    --engine-opt="iptables=false" \
    ${2}

  docker-machine ssh ${2} sudo usermod -aG docker vagrant
  docker-machine ssh ${2} sudo iptables -F
  docker-machine ssh ${2} sudo iptables -P FORWARD ACCEPT

  machine-export ${2}
}

case "$1" in
  "create")
    vagrant plugin install vagrant-vbguest
    vagrant box update
    vagrant up

    npm install -g machine-share

    create_machine 192.168.99.101 npg-01
    create_machine 192.168.99.102 npg-02

    docker-machine ssh npg-01 docker swarm init --advertise-addr 192.168.99.101
    TOKEN=`docker-machine ssh npg-01 docker swarm join-token worker -q`
    docker-machine ssh npg-02 docker swarm join --token ${TOKEN} 192.168.99.101:2377
    ;;

  "destroy")
    docker-machine rm -y npg-01 npg-02 2>/dev/null
    vagrant destroy -f
    ;;

  *)
    echo "usage: $0 [ create | destroy ]"
    ;;

esac
