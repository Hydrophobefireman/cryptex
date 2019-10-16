import {
  FileDropAcceptorLazy,
  WorkerListenerLazy
} from "../../perf/lazyLoader.js";
import { exportPromise } from "../../exportPromise.js";
import WebpackWorker from "worker-loader!../../workers/decryption-worker.js";
import { h } from "../../@ui/ui-lib.js";
import downloadSVG from "../../download.svg";

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
      this.setState({
        hasResult: FileDropAcceptor._getBlob(
          decrypted.file,
          this.state._fileType /**@todo */ || "application/octet-stream"
        )
      });
    };
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
          class: "svg-box-div"
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
  };
}
export default exportPromise(FileDropAcceptorLazy, defaultExport);
