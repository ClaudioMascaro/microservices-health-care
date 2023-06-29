import { DataTypes } from 'sequelize'

const tableName = 'Users'

const attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const options = {
  tableName,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

function define (database) {
  const model = database.define(tableName, attributes, options)

  return model
}

export default {
  define,
}
