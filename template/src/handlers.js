const JiraClient = require("./jira")
const { RBS } = require("@releai/rb-node-sdk")
const logger = require("@releai/rb-node-sdk/src/utils/logger")

// create new router instance
const router = new RBS.Router()

/**
 * Search for an issue with the provided query
 * in JIRA.
 *
 * @param {Request} req - RB's request object.
 * @param {Response} res - RB's response object.
 */
router.use("search_issue", async (req, res) => {
    // debug icoming request
    logger.debug({
        message: "recieved request to search_issue endpoint",
        payload: req.payload
    })

    try {
        // initate JIRA Client
        const client = new JiraClient("DEMO")

        // search in jira
        const { issues, key ,total } = await client.searchIssue(req.payload.query)
        const issuesMessage = issues.map((issue) => `*- Summary:* ${issue.fields.summary}\n ➡️ ${process.env.JIRA_BASE_URL}/browse/${issue.key}` )

        // manage response to user
        res.send(200, {
            message: total
                ? `*I've found ${total} issues.* 😯 \n*Here's a summary:*\n\n${issuesMessage.join("\n\n")}`
                : `I couldn't find any issues 🤨`
        })
    } catch (err) {
        logger.error({
            message: "unable to search issue",
            error: err.message
        })

        res.send(400, { error: err.message })
    }
})

/**
 * Create a new issue in JIRA.
 *
 * @param {Request} req - RB's request object.
 * @param {Response} res - RB's response object.
 */
router.use("create_issue", async (req, res) => {
    // debug icoming request
    logger.debug({
        message: "recieved request to create_issue endpoint",
        payload: req.payload
    })

    try {
        // initate JIRA Client
        const client = new JiraClient("DEMO")

        // create a new issue
        const { id, key, self } = await client.createIssue(req.payload.summary, req.payload.description)

        // manage response to user
        id
            ? res.send(200, { issue_created: true, link: self, message: `Here's the link for the new issue:\n${process.env.JIRA_BASE_URL}/browse/${key}` })
            : res.send(500, { issue_created: false })
    } catch (err) {
        logger.error({
            message: "unable to create issue",
            error: err.message
        })

        res.send(500, { issue_created: false, error: err.message })
    }
})

module.exports = router
