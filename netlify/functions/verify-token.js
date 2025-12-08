// Verify authentication token

exports.handler = async (event) => {
    const authHeader = event.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'No token provided' })
        };
    }

    const token = authHeader.split(' ')[1];
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [timestamp, password] = decoded.split(':');

        // Check if token is valid (password matches and not expired - 24 hours)
        const tokenAge = Date.now() - parseInt(timestamp);
        const maxAge = 86400000; // 24 hours

        if (password === adminPassword && tokenAge < maxAge) {
            return {
                statusCode: 200,
                body: JSON.stringify({ valid: true })
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Token expired or invalid' })
            };
        }
    } catch (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Invalid token' })
        };
    }
};
