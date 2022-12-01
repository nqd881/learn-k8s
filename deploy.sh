docker build -t loserforever/learn-k8s-server:latest -t loserforever/learn-k8s-server:$SHA -f Dockerfile ./

docker push loserforever/learn-k8s-server:latest
docker push loserforever/learn-k8s-server:$SHA

kubectl apply -f ./k8s
kubectl set image deployment/server-deployment server=loserforever/learn-k8s-server:$SHA