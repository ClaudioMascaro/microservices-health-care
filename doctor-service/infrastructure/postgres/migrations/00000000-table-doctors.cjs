const tableName = 'Doctors'

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      license_type: {
        type: DataTypes.STRING,
      },
      medical_license: {
        type: DataTypes.STRING,
      },
      specialty: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      week_schedule: {
        type: DataTypes.JSON,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    })
  },

  down(queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
