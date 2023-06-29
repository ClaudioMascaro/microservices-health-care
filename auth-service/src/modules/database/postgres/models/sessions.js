import { DataTypes } from 'sequelize'

const tableName = 'Sessions'

const attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keepSigned: {
    type: DataTypes.BOOLEAN,
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
