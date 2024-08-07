#!/bin/bash

cd /root/cg-main-website || exit
git pull && docker build --no-cache -t cg-website . && docker stop cgwebsite && docker rm cgwebsite && docker run -d -p 3000:3000 --name cgwebsite cg-website && docker system prune --force
