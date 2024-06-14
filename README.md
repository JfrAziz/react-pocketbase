# React Pocketbase

This project just a starter to develop pocketbase with react frontend (SPA vite):

- react (typescript)
- tailwind
- [shadcn UI components](https://ui.shadcn.com/)
- [pocketbase typegen](https://github.com/david-plugge/typed-pocketbase)
- [docker support](#production)
- [docker development](#development-with-docker) (with local SMTP and S3 support)

# Development

to run this project in development, you need to run 
- frontend (react): `pnpm run dev`
- pocketbase: binary / docker

also check for some [env variablestext](./.env.example) first

if you use docker for pocketbase, ensure you have the following installed on your machine:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

I have 2 docker-compose file for you to use based on what you need, default and full local. use the default [`docker-compose.yml`](./docker-compose.yml), if you only need to run pocketbase. use full local [`docker-compose-full.yml`](./docker-compose-full.yml), if you need to setup additional services such as **mailpit** (SMTP) and **MinIO** (S3 compatible). as you know, pocketbase support that. if you use this config, make sure you follow this step before running it.

## Step 1: Generate a Self-Signed Certificate

to secure the Mailpit SMTP server, generate a self-signed SSL certificate. this because pocketbase need smtp server to be secured (Always or StartTLS), so we need to create self-signed certificate for mailpit, also we need to update pocketbase container to add this certificate, check [start.sh](./dev/start.sh). run the following command in your terminal to generate certificate:

```sh
openssl req -x509 -newkey rsa:4096 -nodes -keyout ./dev/key.pem -out ./dev/cert.pem -sha256 -days 3650 -subj "/CN=." -addext "subjectAltName = DNS:mailpit"
```

## Step 2: SMTP and MinIO Config

after you run all the services defined in the [`docker-compose-full.yml`](./docker-compose-full.yml) file, `docker-compose -f docker-compose-full.yml up -d`. check all services already running:

- pocketbase: [localhost:8080/_/](http://localhost:8080/_/)
- MinIO Console: [localhost:9001](http://localhost:9001) *you need to setup new bucket and access key*
- Mailpit: [localhost:8025](http://localhost:8025)

add this config for SMTP and Minio in pocketbase settings.

```
SMTP server host: mailpit
Port: 1025
Username: mailpit
Password: mailpit

S3 Endpoint: http://minio:9000
Bucket: <bucket name>
Access Key: <access key>
Secret: <secret>
Force path style addressing: True
```

then you can test if smtp and S3 connection works properly or not

# Production

use [Dockerfile](./Dockerfile) to build this project into single image, the frontend and pocketbase.