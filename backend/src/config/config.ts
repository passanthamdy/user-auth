export default () => ({
    jwt: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    }, 
    database: {
        dbUri: process.env.MONGODB_URI,
    }
    
})