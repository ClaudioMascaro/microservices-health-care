import { DataTypes } from 'sequelize'

const tableName = 'Doctors'

const attributes = {
  name: DataTypes.STRING,
  specialty: DataTypes.STRING,
  medical_license: DataTypes.STRING,
  license_type: DataTypes.STRING,
  company_id: DataTypes.ARRAY(DataTypes.STRING),
  week_schedule: DataTypes.JSON,
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
