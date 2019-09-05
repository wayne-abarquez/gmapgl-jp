#!/usr/bin/env bash

venv/bin/gunicorn -w 2 --preload -b 127.0.0.1:8080 run:app --log-level=DEBUG --timeout=120