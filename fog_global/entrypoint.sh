#!/bin/bash
# mySQL
sed -i "s/bind-address		= 127.0.0.1/# bind-address		= 127.0.0.1/g" /etc/mysql/my.cnf
/etc/init.d/mysql restart
mysql -uroot -Dmysql -e"use mysql;"
echo "use mysql"
#mysql -uroot -Dmysql -e"select host,user from user;"
mysql -uroot -Dmysql -e"update user set password=password(\"<your password>\") where user='root';"
echo "update user set password=password(\"<your password>\") where user='root';"
mysql -uroot -Dmysql -e"flush privileges;"
echo "flush privileges;"
/etc/init.d/mysql restart
# admit join in mysql from remote;
mysql -uroot -pdir7413 -e"INSERT INTO mysql.user (host,USER,password) VALUES ('%','root',password('dir7413'));"
echo "INSERT INTO mysql.user (host,USER,password) VALUES ('%','root',password('<your password>'));"
mysql -uroot -pdir7413 -e"GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';"
echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';"
mysql -uroot -pdir7413 -e"FLUSH PRIVILEGES;"
echo "FLUSH PRIVILEGES;"
/etc/init.d/mysql restart


# nodejs
cd /workspace/nodejs
#npm install express
#node app.js
forever start app.js


# diamond
sed -i "s/host = graphite/host = $GRAPHITE_HOST/g" /etc/diamond/diamond.conf
sed -i "s/# interval = 300/interval = 10/g" /etc/diamond/diamond.conf
diamond


# nginx
cd /etc/nginx
nginx


