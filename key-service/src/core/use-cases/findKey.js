export default function findKeyFactory ({ keyRepository }) {
  return async function execute ({ request }, callback) {
    const {
      payload,
    } = request

    const {
      userId,
    } = JSON.parse(payload)

    const result = await keyRepository.find({ 
      userId,
    })

    const encryptionKey = result?.encryptionKey

    return callback(null, {
      payload: JSON.stringify({
        encryptionKey
      }),
    })
  }
}
