export default function doctorControllerFactory ({ DoctorService }) {
  async function affiliate ({ body: params }) {
    const affiliatedDoctor = await DoctorService
      .affiliateDoctor({ payload: JSON.stringify(params) })

    return {
      body: JSON.parse(affiliatedDoctor.payload),
      statusCode: 201,
    }
  }

  return {
    affiliate,
  }
}
