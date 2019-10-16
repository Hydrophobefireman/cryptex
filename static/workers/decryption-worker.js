import { Manager } from "./_common.js";
import { WORKER_RESPONSES } from "../common.js";
class DecryptionManager extends Manager {
  _getKeyDict(method, iv) {
    return { name: method, iv };
  }
  async __decrypt(file, method, userKey) {
    const metaData = await Manager._getMetaFromBuffer(file);
    const { iv, key } = metaData.metaData;
    const { encryptedBuffer } = metaData;
    const ivBuf = await Manager.base64ToArrayBuffer(iv);
    const importedKey = await crypto.subtle.importKey(
      "raw",
      await Manager.base64ToArrayBuffer(Manager.dec(userKey)(key)),
      method,
      true,
      ["encrypt", "decrypt"]
    );
    return await crypto.subtle.decrypt(
      this._getKeyDict(method, ivBuf),
      importedKey,
      encryptedBuffer
    );
  }
  async onFile(file, method, userKey) {
    try {
      const data = await this.__decrypt(file, method, userKey);
      return this.listener.transfer(
        { type: WORKER_RESPONSES.file, file: data },
        [data]
      );
    } catch (e) {
      console.log(e);
      return this.listener.sendType(
        { error: true, message: e.message },
        WORKER_RESPONSES.error
      );
    }
  }
}

new DecryptionManager().init();
