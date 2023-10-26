

git pull

sudo docker rmi osvauld-web:latest

sudo docker build -t osvauld-web:latest .

sudo docker run -d -p 80:3000 --name osvauldweb osvauld-web:latest