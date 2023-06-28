const tableName = 'Appointments'

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
      },
      doctor_data: {
        type: DataTypes.JSON,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      user_data: {
        type: DataTypes.JSON,
      },
      start_time: {
        type: DataTypes.DATE,
      },
      appointment_time: {
        type: DataTypes.STRING,
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
