
# global variables

echo "Enter project name:"
read project
echo "Enter region:"
read region
echo "Enter cluster name:"
read cluster_name

WORKING_DIR=$(pwd)

if [[ "$project" && $region && $cluster_name ]]; then
    # build image
    docker build . -t jira -f "$WORKING_DIR/Dockerfile"
    # change image name
    docker tag jira:latest eu.gcr.io/$project/jira
    # docker push
    docker push "eu.gcr.io/$project/jira"
    # rb tool
    rb auth:login
    # gcloud cluster login
    gcloud container clusters get-credentials $cluster_name --region $region --project $project
    # rb tool apply
    BASE_URL="jira:60001" # RELEAI CASE (have to corispondig to k8s yaml in port value)
    sed -i'.bkp' -e "s/PLACEHOLDER_BASE_URL/$BASE_URL/g" "$WORKING_DIR/configs/app.yaml"
    rb apply -f configs
    # placeholder replace
    IMAGE_NAME="eu.gcr.io\/$project\/jira"
    sed -i'.bkp' -e "s/PLACEHOLDER_IMAGE_NAME/$IMAGE_NAME/g" "$WORKING_DIR/k8s/jira.yaml"
    #k8s deployment / vs / service / gw
    kubectl apply -f "$WORKING_DIR/k8s/jira.yaml"
fi