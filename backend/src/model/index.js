const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Equipment = require('./equipment.model')(sequelize, DataTypes);
db.Booking = require('./booking.model')(sequelize, DataTypes);

// relationships
db.User.hasMany(db.Booking, { foreignKey: 'userId', field: 'user_id' });
db.Booking.belongsTo(db.User);

db.Equipment.hasMany(db.Booking, { foreignKey: 'equipmentId', field: 'equipment_id' });
db.Booking.belongsTo(db.Equipment);

module.exports = db;