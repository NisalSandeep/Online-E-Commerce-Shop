const path = require('path');

const express = require('express');

const csurf = require('csurf');

const session = require('express-session');

const createSessionConfig = require('./config/session');

const db = require('./data/database');

const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const handleError = require('./middlewares/error-hanlder');
const checkAuthStatus = require('./middlewares/check-auth');
const protectRoutes = require('./middlewares/protect-routes');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig(session);

app.use(session(sessionConfig))

app.use(csurf()); // Not GET requests

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatus);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(protectRoutes)
app.use('/admin', adminRoutes); //if the route starts with /admin use adminRoutes

app.use(handleError);

db.ConnectToDatabase().then(function () {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(function (error) {
  console.log('Failed to connect to the database!');
  console.log(error);
});

