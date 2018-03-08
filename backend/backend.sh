#!/bin/bash

# https://blog.codeship.com/using-swarm-with-calico-on-docker-machine/
# https://blog.scottlowe.org/2015/08/04/using-vagrant-docker-machine-together/

case "$1" in
  "create")
    vagrant plugin install vagrant-vbguest
    vagrant up
    docker-machine create -d generic --generic-ssh-user vagrant --generic-ssh-key ~/.vagrant.d/insecure_private_key --generic-ip-address 192.168.99.101 --engine-opt="cluster-store=etcd://192.168.99.101:2379" npg-01
    docker-machine create -d generic --generic-ssh-user vagrant --generic-ssh-key ~/.vagrant.d/insecure_private_key --generic-ip-address 192.168.99.102 --engine-opt="cluster-store=etcd://192.168.99.101:2379" npg-02
    docker-machine ssh npg-01 sudo calicoctl node run --node-image=quay.io/calico/node:v2.6.8
    docker-machine ssh npg-02 sudo calicoctl node run --node-image=quay.io/calico/node:v2.6.8
    ;;

  "destroy")
    docker-machine rm -y npg-01
    docker-machine rm -y npg-02
    vagrant destroy -f
    ;;

  "status")
    docker-machine ls
    ;;

  "test")
    echo "npg-01"
    echo "------"
    docker-machine ssh npg-01 etcd --version
    docker-machine ssh npg-01 calicoctl --version
    docker-machine ssh npg-01 sudo calicoctl node checksystem
    docker-machine ssh npg-01 sudo calicoctl node status
    echo ""
    echo "npg-02"
    echo "------"
    docker-machine ssh npg-02 calicoctl --version
    docker-machine ssh npg-02 sudo calicoctl node checksystem
    docker-machine ssh npg-02 sudo calicoctl node status
    ;;
  
  *)
    echo "usage: $0 [ create | destroy | status | test]"
    ;;
esac
