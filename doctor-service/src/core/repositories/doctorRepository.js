function doctorRepositoryFactory ({ postgresDatabase }) {
  const { Doctors } = postgresDatabase.sequelize.models

  async function create ({ params }) {
    try {
      return await Doctors.create(params)
    } catch (error) {
      throw new Error('todo')
    }
  }

  return {
    create,
  }
}

export default doctorRepositoryFactory
