const { sequelize } = require("../../config/database");
const { DataTypes, UUID } = require("sequelize");

const Address = sequelize.define("Address", {
  addressId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  country: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  street: {
    type: DataTypes.STRING,
  },
  houseNumber: {
    type: DataTypes.STRING,
  },
});

Address.beforeSync(() => {
  console.log('before creating address table')
})

Address.afterSync(() => {
  console.log('after creating address table')
})

module.exports = { Address };
