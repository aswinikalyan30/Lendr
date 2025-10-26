require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('../src/config/db.config');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

db.sync({ alter: true }).then(() => console.log('Database synced'));

app.use('/v1/auth', require('./routes/auth.routes'));
app.use('/v1/equipment', require('./routes/equipment.routes'));
app.use('/v1/bookings', require('./routes/booking.routes'));
app.use('/v1/users', require('./routes/users.routes'));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
