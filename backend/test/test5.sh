#!/bin/bash

# setup
sudo mkdir -p /var/run/netns
docker run -tid --rm --name n1 --net none busybox > /dev/null
CPID=`docker inspect n1 -f "{{ .State.Pid }}"`
#echo CPID=$CPID
sudo ln -sf /proc/$CPID/ns/net /var/run/netns/n1
sudo ip link add veth0 type veth peer name veth1
sudo ip link set veth1 netns $CPID
sudo ip link set dev veth0 up
MAC=`docker exec n1 ip a show dev veth1 | grep link | tr -s ' ' | cut -d' ' -f3`
#echo MAC=$MAC
sudo ip netns exec n1 ip link set dev veth1 name eth0 address $MAC
sudo ip netns exec n1 ip link set eth0 up
sudo ip netns exec n1 ip addr add dev eth0 172.20.35.2/32
sudo ip netns exec n1 ip r add 169.254.1.1 dev eth0 scope link
sudo ip netns exec n1 ip r add default via 169.254.1.1 dev eth0
sudo sh -c 'echo 1 > /proc/sys/net/ipv4/conf/veth0/proxy_arp'
sudo ip r add 172.20.35.2 dev veth0 scope link
sudo ip r add blackhole 172.20.35.0/24
sudo iptables -t nat -A POSTROUTING -o enp0s3 -j MASQUERADE -s 172.20.0.0/16

# check
docker exec n1 ip a
ping -c 3 172.20.35.2
docker exec n1 ping -c 3 192.168.99.101
# sudo iptables -P FORWARD ACCEPT
docker exec n1 ping -c 3 8.8.8.8

# destroy
docker stop n1 -t 0 > /dev/null
sudo rm /var/run/netns/n1
sudo ip r del blackhole 172.20.35.0/24
