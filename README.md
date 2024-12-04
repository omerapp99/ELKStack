# Weather App with ELK Stack Integration

This project is a weather forecast application built using a microservices architecture, including a frontend interface, a backend API, and an Nginx reverse proxy. The application also integrates with an ELK (Elasticsearch, Logstash, Kibana) stack for log collection, processing, and visualization. Filebeat is used to ship logs from the backend to Logstash for further processing and storage.

---

## Table of Contents

1. [📌 Project Overview](#-project-overview)
2. [✨ Features](#-features)
3. [📋 Prerequisites](#-prerequisites)
4. [🛠️ Services Overview](#-services-overview)
5. [🚀 How to Run](#-how-to-run)
6. [📊 Usage](#-usage)

---

## 📌 Project Overview

The **Weather App with ELK Stack Integration** demonstrates a modern approach to building a scalable weather application with real-time log monitoring and analysis. The app architecture comprises:

- **Frontend (Weather UI)**: A React-based user interface for displaying weather data.
- **Backend**: A REST API serving weather data, built with Flask.
- **Nginx**: Acts as a reverse proxy to route traffic efficiently between services.
- **ELK Stack**: Collects, processes, and visualizes logs for system monitoring.
- **Filebeat**: A lightweight shipper for forwarding logs to Logstash.

---

## ✨ Features

- **User-Friendly Interface**: A responsive React frontend to view weather forecasts.
- **Frontend and Backend Integration**: Seamless data flow between the UI and backend API.
- **Reverse Proxy**: Nginx efficiently routes user requests to the backend or other services.
- **Centralized Logging**: Logs are collected and processed by Logstash, with visualization via Kibana.
- **Real-Time Log Monitoring**: Monitor application logs in real-time with the ELK stack and Filebeat.

---

## 📋 Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠️ Services Overview

### 1. **Weather UI**
- **Purpose**: A React-based interface for users to interact with the weather app.
- **Source Code**: `./weather-ui`
- **Port**: `3000`

### 2. **Backend**
- **Purpose**: Provides weather data and handles API requests.
- **Source Code**: `./backend`
- **Port**: `5000`
- **Volumes**:
  - `./logs:/var/log/weather-app`: Stores logs for analysis and processing.

### 3. **Nginx**
- **Purpose**: Acts as a reverse proxy, directing traffic between services.
- **Source Code**: `./nginx`
- **Port**: `80`

### 4. **Filebeat**
- **Purpose**: Ships logs from the backend service to Logstash for processing.
- **Image**: `docker.elastic.co/beats/filebeat:7.17.1`
- **Container Name**: `filebeat`
- **Volumes**:
  - `./filebeat.yml:/usr/share/filebeat/filebeat.yml`: Configuration file for Filebeat.
  - `./logs:/var/log/weather-app`: Access to application logs.
  - `./certs/logstash.crt:/etc/ssl/certs/logstash.crt`: Certificate for secure communication.

### 5. **ELK Stack**
- **Purpose**: Collects, processes, and visualizes logs for system monitoring.
- **Components**:
  - **Elasticsearch**: Stores and indexes logs for searching and analysis.
  - **Logstash**: Processes and transforms logs before sending them to Elasticsearch.
  - **Kibana**: Visualizes logs and metrics, enabling powerful dashboards and data exploration.
- **Access**:
  - **Elasticsearch**: [http://localhost:9200](http://localhost:9200)
  - **Kibana**: [http://localhost:5601](http://localhost:5601)

---

## 🚀 How to Run

### Step 1: Clone the Repository
```bash
git clone https://github.com/omerapp99/ELKStack.git
cd ELKStack
```
### Step 2: Build and Start Services
```bash
docker-compose up --build
```

### Step 3: Access Services
```bash
Weather UI: http://localhost:3000
Backend API: http://localhost:5000
Nginx: http://localhost
Elasticsearch: http://localhost:9200
Kibana: http://localhost:5601
```

## 📊 Usage
1. Weather UI
```    
Open http://localhost to interact with the weather forecast interface.
```
2. Kibana
```
Access http://localhost:5601 to view and create dashboards based on logs collected in Elasticsearch.
```

## 📂 Project Structure
```
├── certs/                # SSL certificates for secure communication
├── docker-compose.yml    # Docker Compose for the ELKStack
├── logstash.conf         # Logstash configuration
├── README.md             # Project documentation
├── webapp/               # Main application directory
│   ├── backend/          # Flask backend code
│   ├── logs/             # Application logs directory
│   ├── nginx/            # Nginx configuration
│   ├── vectors/          # Vector data for web app
│   └── weather-ui/       # React frontend code
```