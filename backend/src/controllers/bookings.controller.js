const db = require('../model');
const Booking = db.Booking;
const Equipment = db.Equipment;
const User = db.User;

// [POST] /api/v1/bookings
exports.create = async (req, res) => {
  try {
    const { equipmentId, requestedAt, returnedAt } = req.body;
    const userId = req.user.id;

    const equipment = await Equipment.findByPk(equipmentId);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    if (equipment.quantity <= 0)
      return res.status(400).json({ message: 'Equipment unavailable' });

    const booking = await Booking.create({
      userId,
      equipmentId,
      requestedAt,
      returnedAt,
      status: 'PENDING',
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// [GET] /api/v1/bookings
exports.list = async (req, res) => {
  try {
    const user = req.user;

    const whereClause = user.role === 'STUDENT' ? { userId: user.id } : {};

    const bookings = await Booking.findAll({
      where: whereClause,
      include: [
        { model: Equipment, attributes: ['id', 'name', 'category'] },
        { model: User, attributes: ['id', 'name', 'email'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [PATCH] /api/v1/bookings/:id/approve
exports.approve = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, { include: [Equipment] });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status !== 'PENDING')
      return res.status(400).json({ message: 'Booking not pending' });

    const equipment = booking.Equipment;
    if (equipment.quantity <= 0)
      return res.status(400).json({ message: 'No stock available' });

    await booking.update({ status: 'APPROVED' });
    await equipment.decrement('quantity', { by: 1 });

    res.json({ message: 'Booking approved', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [PATCH] /api/v1/bookings/:id/reject
exports.reject = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.update({ status: 'REJECTED' });
    res.json({ message: 'Booking rejected', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [PATCH] /api/v1/bookings/:id/return
exports.returned = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, { include: [Equipment] });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status !== 'APPROVED')
      return res.status(400).json({ message: 'Booking not active' });

    await booking.update({ status: 'RETURNED', returnedAt: new Date() });
    await booking.Equipment.increment('quantity', { by: 1 });

    res.json({ message: 'Equipment returned successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
