#!/bin/bash

python3 /app/pre_start.py
uvicorn SSSP.api.app:apimain --host 0.0.0.0 --port 443 --reload

