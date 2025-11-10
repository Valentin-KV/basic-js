const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
    return this.process(message, key, true);
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Incorrect arguments!");
    }
    return this.process(encryptedMessage, key, false);
  }

  process(text, key, isEncrypt) {
    text = text.toUpperCase();
    key = key.toUpperCase();

    let result = [];
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      if (char >= 'A' && char <= 'Z') {
        let textCode = char.charCodeAt(0) - 65;
        let keyCode = key[keyIndex % key.length].charCodeAt(0) - 65;

        let newCode;
        if (isEncrypt) {
          newCode = (textCode + keyCode) % 26;
        } else {
          newCode = (textCode - keyCode + 26) % 26;
        }

        result.push(String.fromCharCode(newCode + 65));
        keyIndex++;
      } else {
        result.push(char);
      }
    }
    let final = result.join('');
    return this.direct ? final : final.split('').reverse().join('');
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
