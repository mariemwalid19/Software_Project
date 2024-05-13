
import CryptoJS from 'crypto-js';

const key = "oFI40w0GUu8k+AQd";
const iv = "qKeV/VvNjt/3qBr0";

class Security {

  encryptData(plaintext) {
    try {
      // Convert IV and key from Base64 to arrays of bytes
      const ivBytes = CryptoJS.enc.Base64.parse(iv);
      const keyBytes = CryptoJS.enc.Base64.parse(key);
  
      // Configure encryption parameters
      const encryptionOptions = {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      };
  
      // Encrypt plaintext using AES algorithm
      const encryptedBytes = CryptoJS.AES.encrypt(plaintext, keyBytes, encryptionOptions);
  
      // Convert encrypted bytes to base64-encoded ciphertext
      const ciphertext = encryptedBytes.toString();
  
      return ciphertext;
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  }
  
  
  decryptData(encryptedData) {
    try {
      // Convert base64-encoded ciphertext back to a byte array
      const ciphertextBytes = CryptoJS.enc.Base64.parse(encryptedData);
      // Convert IV and key from Base64 to arrays of bytes
      // Convert IV and key from Base64 to arrays of bytes
const ivBytes = CryptoJS.enc.Base64.parse(iv);
const keyBytes = CryptoJS.enc.Base64.parse(key);


      // Configure decryption parameters
      const decryptionOptions = {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        key: keyBytes
      };
      // Decrypt ciphertext using AES algorithm
      const decryptedBytes = CryptoJS.AES.decrypt(
        ciphertextBytes,
        keyBytes,
        decryptionOptions
      );
      // Convert decrypted byte array to a UTF-8 string
      const decryptedText = decryptedBytes.toString()
      return decryptedText;
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }

}

export default Security;
