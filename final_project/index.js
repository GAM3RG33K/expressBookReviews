const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const { JWT_SECRET } = require('./config/config.js')
const { customer_routes } = require('./router/auth_users.js');
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());


app.use("/customer", session({ secret: JWT_SECRET, resave: true, saveUninitialized: true }))

app.use("/customer/auth/*", function auth(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('You are not authorized to access this resource.');
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const user = payload.username;
    if (!user) {
        return res.status(403).send('Invalid user, You are not authorized to access this resource.');
    }
    req.session.user = user;
    next();
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
