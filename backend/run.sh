#!/bin/bash

python3 /app/pre_start.py

# CMD ["uvicorn", "SSSP.api.app:apimain", "--host", "0.0.0.0", "--port", "443", "--reload"]
uvicorn SSSP.api.app:apimain --host 0.0.0.0 --port 443

