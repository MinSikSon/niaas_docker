FROM ubuntu:14.04

# nginx
RUN apt-get update
RUN apt-get install -y nginx \
    git make pbuilder python-mock python-configobj \
    python-support cdbs
    
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
#RUN chown -R www-data:www-data /var/lib/nginx

# node.js
RUN apt-get update
RUN apt-get install -y nodejs npm
RUN mkdir -p /workspace/nodejs
WORKDIR /workspace/nodejs
RUN ln -s /usr/bin/nodejs /usr/bin/node
ADD app.js /workspace/nodejs/app.js
ADD package.json /workspace/nodejs/package.json
#RUN npm install express
RUN npm install
RUN npm install -g forever

# mysql
RUN apt-get install -y mysql-server

# diamond
#RUN apt-get install -y git
WORKDIR /tmp
RUN git clone https://github.com/BrightcoveOS/Diamond.git
RUN cd Diamond && git checkout v3.4 && make deb
RUN dpkg -i Diamond/build/diamond_3.4.0_all.deb
RUN cp /etc/diamond/diamond.conf.example /etc/diamond/diamond.conf

# run sh
#WORKDIR /
ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]


EXPOSE 80
EXPOSE 443
EXPOSE 3306
EXPOSE 9000
