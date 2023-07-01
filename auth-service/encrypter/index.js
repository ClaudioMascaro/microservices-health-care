import crypto from 'crypto-js'

export default function encrypter () {
  function encrypt ({
    password,
    salt,
  }) {
    return crypto.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 100,
    }).toString()
  }

  function compare ({
    passwordHash,
    passwordSalt,
    password,
  }) {
    const hashedPassword = encrypt({
      password,
      salt: passwordSalt,
    })

    return hashedPassword === passwordHash
  }

  function generateRandomKey () {
    return crypto.lib.WordArray.random(16).toString()
  }

  return {
    encrypt,
    compare,
    generateRandomKey,
  }
}
