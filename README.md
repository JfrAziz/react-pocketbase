# React with Pocketbase

## Get Started

Because pocketbase use secure connection for sending email, you must use this command to generate self signed certificate and use in both container.

```sh
openssl req -x509 -newkey rsa:4096 -nodes -keyout ./dev/key.pem -out ./dev/cert.pem -sha256 -days 3650 -subj "/CN=." -addext "subjectAltName = DNS:mailpit"
```