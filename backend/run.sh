#!/bin/bash
. ../.env

python3 -m uvicorn SSSP.api.app:apimain --host 0.0.0.0 --port 443
