#!/bin/sh

# https://stackoverflow.com/questions/67231714/how-to-add-trusted-root-ca-to-docker-alpine

# Copy the certificate to the system's trusted store
cp /development/cert.pem /usr/local/share/ca-certificates/cert.crt

cat /usr/local/share/ca-certificates/cert.crt >> /etc/ssl/certs/ca-certificates.crt

# Update the CA certificates
update-ca-certificates

# Start PocketBase
/pb/pocketbase --dev serve --http=0.0.0.0:8080