WORKING_DIR=$(pwd)

set -o allexport; source .env; set +o allexport

# build image
docker build . -t jira -f "$WORKING_DIR/Dockerfile"
# change image name
docker tag jira:latest eu.gcr.io/$PROJECT_NAME/jira
# docker push
docker push "eu.gcr.io/$PROJECT_NAME/jira"
# rb tool
rb auth:login
# gcloud cluster login
gcloud container clusters get-credentials $CLUSTER_NAME --region $CLOUD_REGION --project $PROJECT_NAME
# rb tool apply
# BASE_URL="jira:60001" # RELEAI CASE (have to correspond to k8s yaml in port value)
# sed -i'.bkp' -e "s/PLACEHOLDER_BASE_URL/$BASE_URL/g" "$WORKING_DIR/configs/app.yaml"
# rb apply -f configs
# placeholder replace
IMAGE_NAME="eu.gcr.io\/$PROJECT_NAME\/jira"
sed -i'.bkp' -e "s/PLACEHOLDER_IMAGE_NAME/$IMAGE_NAME/g" "$WORKING_DIR/k8s/jira.yaml"
#k8s deployment / vs / service / gw
kubectl apply -f "$WORKING_DIR/k8s/jira.yaml"