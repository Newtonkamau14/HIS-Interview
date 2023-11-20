const { sequelize } = require("../../config/database");
const { DataTypes, UUID } = require("sequelize");
const { Address } = require("./address.model");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});

User.beforeSync(() => {
  console.log('before creating user table')
});

User.afterSync(() => {
  console.log('after creating user table')
})

User.hasOne(Address, {
  foreignKey: {
    name: 'userId',
    type: DataTypes.UUID,
  },
});

Address.belongsTo(User);

module.exports = { User };
