FROM python:3.9-slim

WORKDIR /app

# do not caching 
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# and copy 
COPY . .

EXPOSE 443

CMD ["./run.sh"]
# RUN python3 /app/pre_start.py
# CMD ["uvicorn", "SSSP.api.app:apimain", "--host", "0.0.0.0", "--port", "443", "--reload"]
# CMD ["uvicorn", "SSSP.api.app:apimain", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile", "/etc/letsencrypt/live/sssp.live/privkey.pem", "--ssl-certfile", "/etc/letsencrypt/live/sssp.live/fullchain.pem"]

