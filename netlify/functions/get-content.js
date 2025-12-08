// Get stored content (about page, contact page data)
import { getStore } from "@netlify/blobs";

export default async (req, context) => {
    const store = getStore("site-content");

    try {
        // Get about page data
        const aboutData = await store.get("about-page", { type: "json" });

        // Get contact page data
        const contactData = await store.get("contact-page", { type: "json" });

        // Get collage images list
        const collageData = await store.get("collage-images", { type: "json" });

        return new Response(JSON.stringify({
            about: aboutData || null,
            contact: contactData || null,
            collage: collageData || null
        }), {
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
    path: "/api/get-content"
};
