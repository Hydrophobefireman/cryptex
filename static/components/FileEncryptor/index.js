import { exportPromise } from "../../exportPromise.js";
import {
  FileDropAcceptorLazy,
  WorkerListenerLazy
} from "../../perf/lazyLoader.js";
import WebpackWorker from "worker-loader!../../workers/encryption-worker.js";
import { h } from "../../@ui/ui-lib.js";
import downloadSVG from "../../download.svg";

/**
 * @type {Worker}
 */
const encryptionWorker = new WebpackWorker();

/**
 * @type {import('../../workerListener.js').default}
 */
let listener = WorkerListenerLazy.promise();
const getListener = async listener => {
  if (listener instanceof Promise || !!listener.prototype)
    return new (await listener)(encryptionWorker);
  return listener;
};
/**
 *
 * @param {typeof import('../FileDropAcceptor/index.js').default} FileDropAcceptor
 */
function defaultExport(FileDropAcceptor) {
  return class FileEncryptorComponent extends FileDropAcceptor {
    _gotResult() {
      const nm = this.state.file.name;
      const _ = nm ? nm.split(".") : ["download", "bin"];
      const FSHARE_EXT = ".fshare-aes";
      const f = _.length - 1;
      const ext = _[f];
      let name = _.slice(0, f);
      name = name.join(".");
      const downloadName = `${name}.${ext}${FSHARE_EXT}`;
      return h(
        "div",
        null,
        h("div", {
          class: "svg-box-div",
          style: {
            backgroundImage: `url(${downloadSVG})`
          }
        }),
        h("div", null, "Your file is ready"),
        h(
          "div",
          null,
          "File:",
          h("span", { class: "file-name-download" }, downloadName)
        ),
        h(
          "a",
          { href: this.state.hasResult, download: downloadName },
          h("button", { class: "start-app-action " }, "Download")
        )
      );
    }
    _actionText = "Encrypt";
    _actionTextOnClick = async () => {
      listener = await getListener(listener);
      const { method, key } = this.state;
      if (!method) return this.errState("invalidMethod");
      if (!key) return this.errState("noKey");
      const buffer = await this.getFile();
      listener.transfer(
        {
          type: FileDropAcceptor.WORKER_COMMANDS.file,
          file: buffer,
          method,
          key
        },
        [buffer]
      );
      const encrypted = await listener.waitFor(
        FileDropAcceptor.WORKER_RESPONSES.file
      );
      this.setState({
        hasResult: FileDropAcceptor._getBlob(
          encrypted.file,
          "application/octet-stream"
        )
      });
    };
  };
}
export default exportPromise(FileDropAcceptorLazy, defaultExport);
