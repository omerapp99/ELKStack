FROM python:3.12-slim

RUN apt-get update && \
    apt-get install -y gdal-bin libgdal-dev

WORKDIR /python-docker

COPY . .

RUN pip install --upgrade pip setuptools && \
    pip install -r requirements.txt


CMD ["gunicorn", "-b", "0.0.0.0:5000", "--workers", "3", "--access-logfile", "-", "--error-logfile", "-", "server:app"]
