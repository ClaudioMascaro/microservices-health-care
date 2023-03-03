function doctorRepositoryFactory({ postgresDatabase }) {
  const { Doctors } = postgresDatabase.sequelize.models

  async function create({ params }) {
    try {
      return await Doctors.create(params)
    } catch (error) {
      throw error
    }
  }
  /*
  async function list({ queryParams }) {
    try {
      const query = getElasticsearchQuery(queryParams)

      const response = await elasticsearch.search({
        index: 'doctors',
        body: query,
      })

      return buildResponse(response, queryParams)
    } catch (error) {
      throw error
    }
  }

  async function getDetails({ doctorId }) {
    try {
      return await Doctors.findByPk(doctorId)
    } catch (error) {
      throw error
    }
  }

  async function updateDetails({ doctorId, params }) {
    try {
      return await Doctors.update(params, {
        where: { id: doctorId },
      })
    } catch (error) {
      throw error
    }
  }
*/
  return {
    create,
    //list,
    // getDetails,
    //updateDetails,
  }
}

export default doctorRepositoryFactory
