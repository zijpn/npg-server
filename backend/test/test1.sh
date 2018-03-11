#!/bin/bash

etcd --version | head -n 1
systemctl status etcd.service