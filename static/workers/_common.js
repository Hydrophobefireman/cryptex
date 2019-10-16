import assign from "@hydrophobefireman/j-utils/@build-modern/src/modules/Object/assign.js";
import WorkerListener from "../workerListener.js";
const WORKER_COMMANDS = { clear: "CLEAR", file: "FILE", error: "ERROR" };

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const RAW_META_STRING_LENGTH = 0.5 * 1024 * 1024;
const _ = "<---META-DATA--->";
const META_DATA_BOUNDARY = encoder.encode(_);
const META_DATA_BOUNDARY_BUFF = META_DATA_BOUNDARY.buffer;
const META_DATA_LEN = META_DATA_BOUNDARY_BUFF.byteLength;
const META_DATA_BOUNDARY_REVERSE = encoder.encode(
  _.split()
    .reverse()
    .join()
);
// const META_DATA_LEN_TXT = encoder.encode("META_DATA_LENGTH=");
const tenLetters = k => {
  const COUNT = 10;
  k = String(k);
  const c = k.length;
  if (c > COUNT) throw new Error("Invalid length");
  if (c == COUNT) return k;
  while (k.length !== COUNT) k = `0${k}`;
  return k;
};
const _getNumber = n => {
  const ZERO = "0";
  const c = `${n}`;
  const arr = [];
  let isStart0 = true;
  for (const i of c) {
    if (i === ZERO) {
      if (!isStart0) {
        arr.push(i);
      } else {
        if (isStart0) isStart0 = false;
        arr.push(i);
      }
    }
  }
};

export class Manager {
  static _encodeString(str) {
    return encoder.encode(str);
  }

  static _getMetaDataBuffer(meta) {
    return new Promise(resolve => {
      const metaData =
        typeof meta === "string"
          ? encoder.encode(tenLetters(meta.length) + meta)
          : meta;
      const buf = Manager.appendBuffers(metaData);
      return resolve(buf);
    });
  }
  static _getMetaFromBuffer(buffer) {
    return new Promise(resolve => {
      const TEN = 10;
      const metaDataLen = buffer.slice(0, TEN);
      const num = +decoder.decode(metaDataLen).replace(/^0+/, "") + TEN;
      const metaData = JSON.parse(decoder.decode(buffer.slice(TEN, num)));
      const encryptedBuffer = buffer.slice(num);
      resolve({ metaData, encryptedBuffer });
    });
  }
  onFile(file, method, key) {}
  constructor() {
    this.methods = { RSA: "RSA-OAEP", AES: "AES-GCM" };
  }
  init() {
    const listener = new WorkerListener(self);
    this.listener = listener;
    listener.subscribeType(WORKER_COMMANDS.file, message => {
      const { file, method, key } = message;
      this.onFile(file, method, key);
    });
  }
  static appendBuffers(...buffers) {
    const tmp = new Uint8Array(
      buffers.reduce((prev, curr) => prev + curr.byteLength, 0)
    );
    let bl = 0;
    for (const buffer of buffers) {
      tmp.set(
        buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer),
        bl
      );
      bl += buffer.byteLength;
    }
    return tmp.buffer;
  }
  static arrayBufferToBase64(buffer) {
    return new Promise((resolve, _) => {
      const blob = new Blob([buffer], {
        type: "application/octet-stream"
      });
      const reader = new FileReader();
      reader.onload = evt => {
        const dataurl = evt.target.result;
        resolve(dataurl.substr(dataurl.indexOf(",") + 1));
      };
      reader.readAsDataURL(blob);
    });
  }
  static async base64ToArrayBuffer(b64) {
    const data = await fetch(`data:;base64,${b64}`);
    return await data.arrayBuffer();
  }
  static textToChars(text) {
    return text.split("").map(c => c.charCodeAt(0));
  }
  static applySaltToChar(code, salt) {
    return Manager.textToChars(salt).reduce((a, b) => a ^ b, code);
  }
  static enc(salt) {
    const byteHex = n => `0${Number(n).toString(16)}`.substr(-2);
    return text =>
      text
        .split("")
        .map(Manager.textToChars)
        .map(v => Manager.applySaltToChar(v, salt))
        .map(byteHex)
        .join("");
  }
  static dec(salt) {
    return encoded =>
      encoded
        .match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(v => Manager.applySaltToChar(v, salt))
        .map(charCode => String.fromCharCode(charCode))
        .join("");
  }
}
assign(Manager, {
  RAW_META_STRING_LENGTH, //512kb metadata and buffer (seems excessive)
  META_DATA_BOUNDARY,
  META_DATA_BOUNDARY_BUFF,
  META_DATA_LEN,
  META_DATA_BOUNDARY_REVERSE
});
