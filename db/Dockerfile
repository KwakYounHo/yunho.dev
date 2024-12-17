FROM postgres:15-alpine

ENV TZ=Asia/Seoul

COPY *.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
