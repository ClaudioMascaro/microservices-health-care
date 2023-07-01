export default function userRepositoryFactory ({ postgresDatabase }) {
  const { Users } = postgresDatabase.sequelize.models

  async function create ({
    userName,
    email,
    passwordHash,
    passwordSalt,
  }) {
    return Users.create({
      userName,
      email,
      passwordHash,
      passwordSalt,
    })
  }

  async function findByUserName ({
    userName,
  }) {
    return Users.findOne({
      raw: true,
      where: {
        userName,
      },
    })
  }

  return {
    create,
    findByUserName,
  }
}
