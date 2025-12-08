// Get stored content (about page, contact page data)
const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    const store = getStore("site-content");

    try {
        // Get about page data
        const aboutData = await store.get("about-page", { type: "json" });

        // Get contact page data
        const contactData = await store.get("contact-page", { type: "json" });

        // Get collage images list
        const collageData = await store.get("collage-images", { type: "json" });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                about: aboutData || null,
                contact: contactData || null,
                collage: collageData || null
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: error.message })
        };
    }
};
