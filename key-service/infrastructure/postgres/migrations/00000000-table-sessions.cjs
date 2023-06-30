const tableName = 'Sessions'

module.exports = {
  up (queryInterface, DataTypes) {
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true,
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
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    })
  },

  down (queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
