const db = require('../model');
const Equipment = db.Equipment;

// GET  /api/v1/equipment
exports.list = async (req, res) => {
  try {
    const equipments = await Equipment.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(equipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST  /api/v1/equipment
exports.create = async (req, res) => {
  try {
    const { name, category, condition, quantity } = req.body;

    const existing = await Equipment.findOne({ where: { name } });
    if (existing)
      return res.status(400).json({ message: 'Equipment with this name already exists' });

    const equipment = await Equipment.create({
      name,
      category,
      condition,
      quantity: quantity || 1,
    });

    res.status(201).json({ message: 'Equipment added successfully', equipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT  /api/v1/equipment/:id
exports.update = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    await equipment.update(req.body);
    res.json({ message: 'Equipment updated successfully', equipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE  /api/v1/equipment/:id
exports.remove = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    await equipment.destroy();
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
