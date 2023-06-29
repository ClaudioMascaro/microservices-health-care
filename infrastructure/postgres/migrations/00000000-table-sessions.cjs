const tableName = 'Sessions'

module.exports = {
  up (queryInterface, DataTypes) {
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keepSigned: {
        type: DataTypes.BOOLEAN,
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
