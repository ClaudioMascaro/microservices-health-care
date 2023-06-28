import { DataTypes } from 'sequelize'

const tableName = 'Appointments'

const attributes = {
  doctor_id: DataTypes.INTEGER,
  doctor_data: DataTypes.JSON,
  start_time: DataTypes.DATE,
  appointment_time: DataTypes.STRING,
  company_id: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
  user_data: DataTypes.JSON,
}

const options = {
  tableName,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
}

function define (database) {
  const model = database.define(tableName, attributes, options)

  return model
}

export default {
  define,
}
