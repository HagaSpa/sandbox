FROM google/cloud-sdk
WORKDIR /usr/src/app
COPY run.sh ./
COPY init.sh ./
RUN chmod +x run.sh
RUN chmod +x init.sh
CMD ["./init.sh"]