#!/usr/bin/env bash

venv/bin/gunicorn -w 2 --preload -b 127.0.0.1:8091 "TileStache:WSGITileServer('/var/www/gmapgl-jp/tileserver/conf/accounts.cfg')" --log-level=DEBUG --timeout=540