// Authentication function for admin access
// Set ADMIN_PASSWORD in Netlify environment variables

exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { password } = JSON.parse(event.body);
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Admin password not configured' })
            };
        }

        if (password === adminPassword) {
            // Generate a simple session token (valid for 24 hours)
            const token = Buffer.from(`${Date.now()}:${adminPassword}`).toString('base64');

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    token,
                    expiresIn: 86400000 // 24 hours in ms
                })
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid password' })
            };
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid request' })
        };
    }
};
