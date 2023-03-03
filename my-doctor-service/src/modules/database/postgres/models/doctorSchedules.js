import { DataTypes } from 'sequelize'

const tableName = 'DoctorSchedules'

const attributes = {
  // todo
}

const options = {
  tableName,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
}

function define(database) {
  const model = database.define(tableName, attributes, options)

  return model
}

export default {
  define,
}
