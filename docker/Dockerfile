FROM alpine:3.10.2

ENV NGINX_VERSION 1.17.3
ENV NJS_VERSION   0.3.5
ENV PKG_RELEASE   1

# General
RUN apk update

# create user
# RUN addgroup -S dds3 && adduser -S dds3 -G dds3
# RUN echo "dds3 ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Install system packages
RUN apk add --no-cache bash
RUN apk add --update nodejs npm

# Create DIR(s)
RUN mkdir -p /application/tmp

# Copy Code
COPY . /application/tmp/
RUN ["/bin/sh", "/application/tmp/deployments/install.sh", "/application/tmp"]
RUN rm -rf /application/tmp/

WORKDIR /application

# CleanUp

# Port/Protocol
EXPOSE 80/tcp

# Run Application

CMD ["/usr/bin/quasar", "serve", "-p", "80", "-H", "0.0.0.0"]

# Entry
