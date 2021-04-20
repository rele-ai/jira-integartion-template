const axios = require("axios")

/**
 * A JIRA REST API Client
 */
class JiraClient {
    #client
    #project

    /**
     * Initiate the JIRA Client
     */
    constructor(project) {
        // point to project name
        this.#project = project

        // initiate the base client
        this.#client = axios.create({
            baseURL: `${process.env.JIRA_BASE_URL}/rest/api/2`,
            auth: {
                username: process.env.JIRA_EMAIL,
                password: process.env.JIRA_API_KEY,
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    /**
     * Search for an issue in JIRA.
     *
     * @param {string} query - Issue query string.
     * @returns {Promise.<object>} - Issues and query metadata.
     */
    searchIssue(query) {
        return this.#client.get(`/search?jql=${query}`).then((res) => res.data)
    }

    /**
     * Create a new issue in JIRA.
     *
     * @param {string} summary - Issue title.
     * @param {string} description - Issue description.
     * @returns {Promise<object>} -Issue details.
     */
    createIssue(summary, description) {
        return this.#client.post(
            "/issue",
            {
                fields: {
                    project: {
                        key: this.#project
                    },
                    summary: summary,
                    description: description,
                    issuetype: {
                        name: "Bug"
                    }
                }
            }
        ).then((res) => res.data)
    }
}

// export JIRA client
module.exports = JiraClient
