const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger/swagger.json');
const cors = require('cors');
const passport = require('passport');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Passport config 
require('./src/config/passport');
app.use(passport.initialize());

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));

// Rotas (com DEBUG)
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const authRoutes = require('./src/routes/authRoutes');

console.log('DEBUG productRoutes:', productRoutes);
console.log('DEBUG categoryRoutes:', categoryRoutes);
console.log('DEBUG userRoutes:', userRoutes);
console.log('DEBUG orderRoutes:', orderRoutes);
console.log('DEBUG authRoutes:', authRoutes);

console.log('TYPES:');
console.log('products:', typeof productRoutes);
console.log('categories:', typeof categoryRoutes);
console.log('users:', typeof userRoutes);
console.log('orders:', typeof orderRoutes);
console.log('auth:', typeof authRoutes);

// Só sobe a API depois do debug
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
