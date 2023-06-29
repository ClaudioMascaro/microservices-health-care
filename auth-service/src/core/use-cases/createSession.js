export default function createSessionFactory ({ sessionRepository }) {
  return async function execute ({ request }, callback) {
    const {
      payload,
    } = request

    const {
      userId,
      keepSigned,
    } = JSON.parse(payload)

    const createdSession = await sessionRepository.create({
      userId,
      keepSigned,
    })

    const { id } = createdSession

    return callback(null, {
      payload: JSON.stringify({ sessionId: id }),
    })
  }
}
