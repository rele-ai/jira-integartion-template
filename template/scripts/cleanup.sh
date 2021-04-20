#!/bin/bash

# global variables
WORKING_DIR=$(pwd)

# deactivate workflows
rb workflow:deactivate search_issue -d user
rb workflow:deactivate create_issue -d user

# remove configurations
rb delete -f "$WORKING_DIR/configs"
