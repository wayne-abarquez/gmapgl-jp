#!/usr/bin/env bash

sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/gmapgl-jp
sudo rm /etc/nginx/sites-enabled/gmapgl-jp
sudo cp conf/local/nginx.conf /etc/nginx/sites-available/gmapgl-jp
sudo ln -s /etc/nginx/sites-available/gmapgl-jp /etc/nginx/sites-enabled/gmapgl-jp
sudo /etc/init.d/nginx reload
