export default function createKeyFactory ({ keyRepository }) {
  return async function execute ({ request }, callback) {
    const {
      payload,
    } = request

    const {
      userId,
      encryptionKey,
    } = JSON.parse(payload)

    await keyRepository.create({ 
      userId,
      encryptionKey,
    })

    return callback(null, {
      payload: JSON.stringify({
        message: 'Key created',
        userId,
      }),
    })
  }
}
