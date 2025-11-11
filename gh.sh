#! /usr/bin/bash

git pull origin master
npm install
# pm2 restart 0
echo "Repo has been updated :)"
