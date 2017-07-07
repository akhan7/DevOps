#! /bin/bash

sudo apt-get update
sudo apt-get -y install git make vim python-dev python-pip libffi-dev libssl-dev libxml2-dev libxslt1-dev libjpeg8-dev zlib1g-dev
sudo apt-get install nodejs
sudo apt-get install npm
npm install
sh helloworld.sh
python HelloWorld.py
