const JiraClient = require("./jira")
const logger = require("@releai/rb-node-sdk/src/utils/logger")

/**
 * Search for an issue with the provided query
 * in JIRA.
 *
 * @param {Request} req - RB's request object.
 * @param {Response} res - RB's response object.
 */
module.exports.search_issue = async (req, res) => {
    // debug icoming request
    logger.debug({
        message: "recieved request to search_issue endpoint",
        payload: req.payload
    })

    try {
        // initate JIRA Client
        const client = new JiraClient("DEMO")

        // search in jira
        const { issues, total } = await client.searchIssue(req.payload.query)
        const issuesMessage = issues.map((issue) => `- Summary: ${issue.fields.summary}\n  Link: ${issue.self}`)

        // manage response to user
        res.send(200, {
            message: total
                ? `I've found ${total} issues.\nHere's a summary:\n${issuesMessage.join("\n\n")}`
                : `I couldn't find any issues 🤨`
        })
    } catch (err) {
        logger.error({
            message: "unable to search issue",
            error: err.message
        })

        res.send(400, { error: err.message })
    }
}

/**
 * Create a new issue in JIRA.
 *
 * @param {Request} req - RB's request object.
 * @param {Response} res - RB's response object.
 */
module.exports.create_issue = async (req, res) => {
    // debug icoming request
    logger.debug({
        message: "recieved request to create_issue endpoint",
        payload: req.payload
    })

    try {
        // initate JIRA Client
        const client = new JiraClient("DEMO")

        // create a new issue
        const { id, self } = await client.createIssue(req.payload.summary, req.payload.description)

        // manage response to user
        id
            ? res.send(200, { issue_created: true, link: self, message: `Here's the link for the new issue:\n${self}` })
            : res.send(500, { issue_created: false })
    } catch (err) {
        logger.error({
            message: "unable to create issue",
            error: err.message
        })

        res.send(500, { issue_created: false, error: err.message })
    }
}
