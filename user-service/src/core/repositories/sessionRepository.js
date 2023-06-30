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

  async function findByUserId ({
    userId,
  }) {
    try {
      return await Sessions.findOne({
        raw: true,
        where: {
          userId,
        },
        order: [['createdAt', 'DESC']],

      })
    } catch (error) {
      throw new Error('todo')
    }
  }

  return {
    create,
    findByUserId,
  }
}
