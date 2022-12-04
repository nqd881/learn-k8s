docker build -t loserforever/learn-k8s-server:latest -t loserforever/learn-k8s-server:$SHA -f Dockerfile ./

docker push loserforever/learn-k8s-server:latest
docker push loserforever/learn-k8s-server:$SHA

cd k8s

kubectl delete -f app -f letsencrypt -f ingress
kubectl apply -f app -f letsencrypt -f ingress
kubectl set image deployment/server-deployment server=loserforever/learn-k8s-server:$SHA
