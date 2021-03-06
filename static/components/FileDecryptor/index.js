import {
  FileDropAcceptorLazy,
  WorkerListenerLazy,
  MimeTypesJson
} from "../../perf/lazyLoader.js";
import { exportPromise } from "../../exportPromise.js";
import WebpackWorker from "worker-loader!../../workers/decryption-worker.js";
import { h, Fragment } from "../../@ui/ui-lib.js";
import downloadSVG from "../../download.svg";
let json = MimeTypesJson.promise();
import { svgBoxDiv, fileNameDownload, startAppAction } from "../../css-data";
const getJson = async json => await json;

/**
 * @type {Worker}
 */
const decryptionWorker = new WebpackWorker();

/**
 * @type {import('../../workerListener.js').default}
 */
let listener = WorkerListenerLazy.promise();
const getListener = async listener => {
  if (listener instanceof Promise || !!listener.prototype)
    return new (await listener)(decryptionWorker);
  return listener;
};
/**
 *
 * @param {typeof import('../FileDropAcceptor/index.js').default} FileDropAcceptor
 */
function defaultExport(FileDropAcceptor) {
  return class FileDecryptorComponent extends FileDropAcceptor {
    _actionText = "Decrypt";
    _actionTextOnClick = async () => {
      listener = await getListener(listener);
      const { method, key } = this.state;
      if (!method) return this.errState("invalidMethod");
      if (!key) return this.errState("noKey");
      const buffer = await this.getFile();
      listener.subscribeType(FileDropAcceptor.WORKER_RESPONSES.error, () =>
        this.errState("errorDecryption")
      );
      listener.transfer(
        {
          type: FileDropAcceptor.WORKER_COMMANDS.file,
          file: buffer,
          method,
          key
        },
        [buffer]
      );
      const decrypted = await listener.waitFor(
        FileDropAcceptor.WORKER_RESPONSES.file
      );
      const ft = await this._getFileType();
      this.setState({
        fileType: ft,
        hasResult: FileDropAcceptor._getBlob(
          decrypted.file,
          ft /**@todo */ || "application/octet-stream"
        )
      });
    };
    async _getFileType() {
      const nm = this.state.file.name;
      const _ = nm ? nm.split(".") : ["download"];
      const f = _.length;
      const maybeFileExt = _[f - 2];
      const js = await getJson(json);
      return js[maybeFileExt] || "application/octet-stream";
    }
    __inlineTypes = ["image", "text", "video", "audio"];
    _gotResult() {
      const nm = this.state.file.name;
      const _ = nm ? nm.split(".") : ["download"];
      const f = _.length - 1;
      const downloadName = _.slice(0, f).join(".");
      return h(
        "div",
        null,
        h("div", {
          style: {
            backgroundImage: `url(${downloadSVG})`
          },
          class: svgBoxDiv
        }),
        h("div", null, "Your file is ready"),
        h(
          "div",
          null,
          "File:",
          h("span", { class: fileNameDownload }, downloadName)
        ),
        h(
          "a",
          { href: this.state.hasResult, download: downloadName },
          h("button", { class: startAppAction }, "Download")
        ),
        this.__inlineTypes.some(x => this.state.fileType.includes(x))
          ? h(
              Fragment,
              null,
              h("div", null, "Preview:"),
              h("iframe", {
                src: this.state.hasResult,
                style: { display: "block", width: "50%", margin: "auto" }
              })
            )
          : null
      );
    }
  };
}
export default exportPromise(FileDropAcceptorLazy, defaultExport);
