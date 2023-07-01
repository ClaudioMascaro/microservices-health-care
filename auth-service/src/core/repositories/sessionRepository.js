export default function sessionRepositoryFactory ({ postgresDatabase }) {
  const { Sessions } = postgresDatabase.sequelize.models

  async function create ({
    userId,
    keepSigned,
  }) {
    return Sessions.create({ userId, keepSigned })
  }

  async function findBySessionId ({
    sessionId,
  }) {
    return Sessions.findOne({
      raw: true,
      where: {
        id: sessionId,
      },
      order: [['createdAt', 'DESC']],

    })
  }

  async function deleteBySessionId ({
    sessionId,
  }) {
    return Sessions.destroy({
      where: {
        id: sessionId,
      },
    })
  }

  return {
    create,
    findBySessionId,
    deleteBySessionId,
  }
}
