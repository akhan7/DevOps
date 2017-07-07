FROM ubuntu:latest
RUN apt-get update && apt-get -y install sudo
RUN sudo apt-get install -y socat
RUN cd ~; echo "Welcome to fileio demo" >> fileio.log;
CMD socat TCP-LISTEN:9001,fork 'SYSTEM:cat ~/fileio.log'
EXPOSE 9001
