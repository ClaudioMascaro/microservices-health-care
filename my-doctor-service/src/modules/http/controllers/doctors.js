export default function affiliateControllerFactory ({ affiliateDoctor }) {
  async function affiliate ({ body: params }) {
    const body = await affiliateDoctor({ params })

    return {
      body,
      statusCode: 200,
    }
  }
  
  return {
    affiliate
  }
}
