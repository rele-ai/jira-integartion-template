
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
    # docker build . -t jira -f "$WORKING_DIR/Dockerfile"
    # change image name
    # docker tag jira:latest eu.gcr.io/$project/jira
    # docker push
    image_name=eu.gcr.io/$project/jira
    echo $image_name
    # docker push $image_name
    # rb tool
    # rb auth:login
    # gcloud cluster login
    # gcloud container clusters get-credentials $cluster_name --region $region --project $region
    # rb tool apply
    # rb apply -f configs
    # placeholder replace
    sed -i'.bkp' "s/IMAGE_NAME_PLACEHOLDER/$image_name/g" "$WORKING_DIR/k8s/jira.yaml"
    # k8s deployment / vs / service / gw
    kubectl apply -f "$WORKING_DIR/k8s/jira.yaml"
fi