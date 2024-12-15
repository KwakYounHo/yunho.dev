FROM bitnami/postgresql:latest

ENV POSTGRESQL_PORT_NUMBER=5488 \
  POSTGRESQL_DATABASE=blog

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE ${POSTGRESQL_PORT_NUMBER}