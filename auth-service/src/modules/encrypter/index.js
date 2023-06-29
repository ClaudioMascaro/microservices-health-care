import crypto from 'crypto-js'

export default function encrypter () {
  function encrypt ({ password, encryptionKey }) {
    return crypto.AES.encrypt(password, encryptionKey).toString()
  }

  function decrypt ({ encryptedText, encryptionKey }) {
    return crypto.AES.decrypt(encryptedText, encryptionKey).toString(crypto.enc.Utf8)
  }

  function generateEncryptionKey () {
    return crypto.lib.WordArray.random(16).toString()
  }

  return {
    encrypt,
    decrypt,
    generateEncryptionKey,
  }
}
