#!/bin/bash

echo ""
calicoctl --version
sudo calicoctl node checksystem
sudo calicoctl node status

echo ""
calicoctl get pool --output wide
calicoctl get policy --output wide
calicoctl get hostEndpoint --output wide
