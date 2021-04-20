# RELE.AI/Jira Integration Demo
This template provides an example for an integration between [RELE.AI](https://rele.ai) and [Jira](https://www.atlassian.com/software/jira).

## Authenticate with RELE.AI
To get access to RELE.AI, run the command below and follow the instructions on the webpage.

```bash
rb auth:login
```

## Prepare environment
Install node dependencies

```bash
npm install
```

Export RELE.AI's app credentials

```bash
# get credentials and export them to the .env file
rb app:tokens | grep 'APP_' | sed 's/: /=/g' >> .env
```

## Local Development
To start a local development server, run:

```bash
# from the project root directory
npm run dev
```

# WhatsApp Usage
## Search Issue
1. Send to RELE.AI's WhatsApp number the new search issue command `/search-issue`
2. Once RELE.AI requested the search query reply back with the information you want to search
3. RELE.AI will send back the founded issues

## Create Issue
1. Send to RELE.AI's WhatsApp number the new create issue command `/create-issue`
2. RELE.AI will request details about the issue
3. RELE.AI will send back a confirmation that the issue was created

You can check your JIRA account and see the new issue :-)

# Support
If you have any questions, please reach out to our [support team](mailto:support@rele.ai)
