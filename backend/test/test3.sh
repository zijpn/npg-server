#!/bin/bash

# not working yet 
# https://github.com/projectcalico/calicoctl/issues/1817

docker network create --driver calico --ipam-driver calico-ipam net1 > /dev/null
# docker network ls -f driver=calico
docker run -tid --rm --net net1 --name n1 busybox > /dev/null
IP=`docker inspect n1 -f "{{ .NetworkSettings.Networks.net1.IPAddress }}"`
docker exec n1 ip a
ping -c 3 $IP
docker exec n1 ping -c 3 192.168.99.101
docker stop n1 -t 0 > /dev/null
docker network rm net1 > /dev/null
