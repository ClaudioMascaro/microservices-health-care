export default function userRepositoryFactory ({ postgresDatabase }) {
  const { Users } = postgresDatabase.sequelize.models

  async function create ({
    userName,
    email,
    password,
  }) {
    return Users.create({ userName, email, password })
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
