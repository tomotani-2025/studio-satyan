// Save content (requires authentication)
const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Method not allowed" })
        };
    }

    // Verify authentication
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
            statusCode: 401,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Unauthorized" })
        };
    }

    const token = authHeader.split(" ")[1];
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
        const decoded = Buffer.from(token, "base64").toString("utf-8");
        const [timestamp, password] = decoded.split(":");
        const tokenAge = Date.now() - parseInt(timestamp);
        const maxAge = 86400000; // 24 hours

        if (password !== adminPassword || tokenAge >= maxAge) {
            return {
                statusCode: 401,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Token expired or invalid" })
            };
        }
    } catch (error) {
        return {
            statusCode: 401,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Invalid token" })
        };
    }

    // Save the content
    try {
        const body = JSON.parse(event.body);
        const { type, data } = body;

        if (!type || !data) {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Missing type or data" })
            };
        }

        const store = getStore("site-content");

        // Valid content types
        const validTypes = ["about-page", "contact-page", "collage-images"];
        if (!validTypes.includes(type)) {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Invalid content type" })
            };
        }

        await store.setJSON(type, data);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: error.message })
        };
    }
};
