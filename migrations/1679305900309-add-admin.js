require('dotenv').config()
const mongoose = require('mongoose');
const roleModel = require('../src/model/role.model');
const userModel = require('../src/model/user.model');

mongoose.connect(process.env.DB_LOCAL, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("MongoDB Connected...");
  })

async function up() {

  const adminRole = await roleModel.findOne({ name: "admin" });
  const adminRoleId = adminRole.id;

  const userRole = await roleModel.findOne({ name: "user" });
  const userRoleId = userRole.id;
  
  const Admin = {
    username: "Admin1234",
    password: "Jonsan@123",
    email: "Admin@outlook.com",
    role: [adminRoleId, userRoleId]
  }

  await userModel.create(Admin)
}

async function down() {
  await userModel.findOneAndDelete({ email: "Admin@outlook.com" })
}

module.exports = { up, down };
