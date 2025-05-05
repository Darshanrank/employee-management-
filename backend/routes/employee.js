const express = require('express');
const multer = require('multer');
const Employee = require('../models/Employee.js');
const { verifyToken } = require('../middleware/auth.js');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.get('/', verifyToken, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

router.get('/search', verifyToken, async (req, res) => {
  const { q } = req.query;
  const result = await Employee.find({ name: { $regex: q, $options: 'i' } });
  res.json(result);
});

router.post('/', verifyToken, upload.single('profilePic'), async (req, res) => {
  const { name, email, type } = req.body;
  const profilePic = req.file ? req.file.path : '';
  const newEmployee = new Employee({ name, email, type, profilePic });
  await newEmployee.save();
  res.status(201).json(newEmployee);
});

router.put('/:id', verifyToken, upload.single('profilePic'), async (req, res) => {
  const { name, email, type } = req.body;
  const profilePic = req.file ? req.file.path : req.body.profilePic;
  const updated = await Employee.findByIdAndUpdate(req.params.id, { name, email, type, profilePic }, { new: true });
  res.json(updated);
});

router.delete('/:id', verifyToken, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
});

router.get('/:id', verifyToken, async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
});

module.exports = router; 