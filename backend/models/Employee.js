const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  type: String,
  profilePic: String,
});
module.exports = mongoose.model('Employee', employeeSchema);