#!/bin/bash

# global variables
WORKING_DIR=$(pwd)

# deactivate workflows
rb workflow:deactivate jira_search_issue -d user
rb workflow:deactivate jira_create_issue -d user

# remove configurations
rb delete -f "$WORKING_DIR/configs"
