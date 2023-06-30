export default function sessionRepositoryFactory ({ postgresDatabase }) {
  const { Sessions } = postgresDatabase.sequelize.models

  async function create ({
    userId,
    keepSigned,
  }) {
    try {
      return Sessions.create({ userId, keepSigned })
    } catch (error) {
      throw new Error('todo')
    }
  }

  async function findBySessionId ({
    sessionId,
  }) {
    try {
      return await Sessions.findOne({
        raw: true,
        where: {
          id: sessionId,
        },
        order: [['createdAt', 'DESC']],

      })
    } catch (error) {
      throw new Error('todo')
    }
  }

  return {
    create,
    findBySessionId,
  }
}
