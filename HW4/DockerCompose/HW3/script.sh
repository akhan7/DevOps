#!/bin/bash
PORT="$1"
docker build -t newfile/new /home/ahmadsaadkhan/Devops/HW4/DockerCompose/HW3
docker run -d -p $PORT:3000 newfile/new 
