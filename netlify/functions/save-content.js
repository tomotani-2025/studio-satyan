// Save content (requires authentication)
import { getStore } from "@netlify/blobs";

export default async (req, context) => {
    // Only allow POST
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { "Content-Type": "application/json" }
        });
    }

    // Verify authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    const token = authHeader.split(" ")[1];
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
        const decoded = Buffer.from(token, "base64").toString("utf-8");
        const [timestamp, password] = decoded.split(":");
        const tokenAge = Date.now() - parseInt(timestamp);
        const maxAge = 86400000; // 24 hours

        if (password !== adminPassword || tokenAge >= maxAge) {
            return new Response(JSON.stringify({ error: "Token expired or invalid" }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid token" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    // Save the content
    try {
        const body = await req.json();
        const { type, data } = body;

        if (!type || !data) {
            return new Response(JSON.stringify({ error: "Missing type or data" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const store = getStore("site-content");

        // Valid content types
        const validTypes = ["about-page", "contact-page", "collage-images"];
        if (!validTypes.includes(type)) {
            return new Response(JSON.stringify({ error: "Invalid content type" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        await store.setJSON(type, data);

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const config = {
    path: "/api/save-content"
};
