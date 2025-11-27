FROM python:3.9-slim

WORKDIR /app

# do not caching 
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 443

CMD ["./run.sh"]