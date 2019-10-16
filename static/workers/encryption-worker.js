import { Manager } from "./_common.js";
import { WORKER_RESPONSES } from "../common.js";
class EncryptionManager extends Manager {
  _getKeyDict(method) {
    if (method === this.methods.RSA) {
      throw new Error("Not implemented yet");
    }
    if (method === this.methods.AES) {
      return {
        name: "AES-GCM",
        length: 256
      };
    }
  }
  async __encrypt(file, method, userKey) {
    const key = await crypto.subtle.generateKey(
      this._getKeyDict(method),
      true,
      ["encrypt", "decrypt"]
    );
    let exportKey, encryptKey;
    const alg = { name: method };
    const metaData = {};
    if (method === this.methods.RSA) {
      const publicKey = key.publicKey;
      const privateKey = key.privateKey;
      exportKey = privateKey;
      encryptKey = publicKey;
    } else {
      exportKey = encryptKey = key;
      const iv = crypto.getRandomValues(new Uint8Array(50));
      alg.iv = iv;
      const ivx = await Manager.arrayBufferToBase64(iv);
      metaData.iv = ivx;
    }
    const saveKey = await Manager.arrayBufferToBase64(
      await crypto.subtle.exportKey("raw", exportKey)
    );
    metaData.key = Manager.enc(userKey)(saveKey);
    const enc = await crypto.subtle.encrypt(alg, encryptKey, file);

    return { enc, metaData };
  }
  /**
   * @param {ArrayBuffer} file
   * @param {string} method
   */
  async onFile(file, method, key) {
    const { enc, metaData } = await this.__encrypt(file, method, key);
    const fin = Manager.appendBuffers(
      await Manager._getMetaDataBuffer(JSON.stringify(metaData)),
      enc
    );
    return this.listener.transfer(
      {
        type: WORKER_RESPONSES.file,
        file: fin
      },
      [file]
    );
  }
}

new EncryptionManager().init();
