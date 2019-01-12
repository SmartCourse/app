FROM microsoft/mssql-server-linux:2017-latest
RUN apt-get update 
RUN apt-get install -y wget curl apt-transport-https 
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - 
RUN wget https://packages.microsoft.com/config/ubuntu/16.04/prod.list -O /etc/apt/sources.list.d/msprod.list 
RUN apt-get update  
RUN echo yes | apt-get install -y msodbcsql 
RUN echo yes | apt-get install -y mssql-tools 
RUN locale-gen en_US en_US.UTF-8 
RUN dpkg-reconfigure -f noninteractive locales