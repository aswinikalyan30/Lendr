module.exports = (sequelize, DataTypes) => {
const Booking = sequelize.define('Booking', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    requestedAt: { type: DataTypes.DATE, allowNull: false, field: 'requested_at' },
    returnedAt: { type: DataTypes.DATE, allowNull: false, field: 'returned_at' },
    status: { type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'RETURNED'), defaultValue: 'PENDING' },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
});

  return Booking;
};
