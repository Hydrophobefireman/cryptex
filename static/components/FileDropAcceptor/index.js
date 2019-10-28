import { Component, h, Fragment } from "../../@ui/ui-lib.js";
import attachIcon from "../../file.svg";
import fileIcon from "../../gotFile.svg";
const hasDrop = "ondrop" in HTMLElement.prototype;
import { WORKER_RESPONSES, WORKER_COMMANDS } from "../../common.js";
import assign from "@hydrophobefireman/j-utils/@build-modern/src/modules/Object/assign.js";
import {
  dashedBorder,
  keyGenEnter,
  svgBoxDiv,
  startAppAction,
  fileHandler,
  fileDetails,
  itemL,
  clicker
} from "../../css-data";
const aptSize = a => {
  const b = 0 | (a / 1048576);
  if (b) return `${b} MB`;
  const c = 0 | (a / 1024);
  return c ? `${c} KB` : `${a} b`;
};
const supports = window.__fshare.cfg.supports;
export default class FileDropAcceptor extends Component {
  state = {
    file: null,
    isWorking: false,
    method: supports.length > 1 ? null : supports[0].algo,
    hasError: false,
    errType: "",
    hasResult: false,
    key: ""
  };
  static _getBlob(buffer, type) {
    const blob = new Blob([buffer], { type });
    return URL.createObjectURL(blob);
  }
  getFile() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.readAsArrayBuffer(this.state.file);
    });
  }
  errState = k =>
    this.setState({ hasError: true, errType: k, isWorking: false });
  ERROR_MESSAGES = {
    invalidMethod: "Please Select a Valid Method",
    noKey: "Please Enter your Key",
    errorDecryption:
      "An error occured while decrypting, please check the key and try again"
  };
  onDrop = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    let file;
    if (ev.dataTransfer.items) {
      for (const i of ev.dataTransfer.items) {
        if (i.kind === "file") {
          file = i.getAsFile();
        }
      }
    } else {
      for (const i of ev.dataTransfer.files) {
        file = i;
      }
    }
    return this.setState({ file });
  };
  onDragOver = ev => ev.preventDefault();
  _fromFilePicker = () => {
    const input = assign(document.createElement("input"), { type: "file" });
    input.addEventListener("change", () =>
      this.setState({ file: input.files[0] })
    );
    input.click();
  };

  getEventListeners() {
    return {
      onDragOver: this.onDragOver,
      onDrop: this.onDrop
    };
  }

  _noFile = h(
    Fragment,
    null,
    h("div", { dataText: "" }, "Click to add file or drag and drop"),
    hasDrop &&
      h(
        "div",
        { class: dashedBorder, ...this.getEventListeners() },
        h("div", {
          class: attachIcon,
          style: {
            backgrouclassndImage: `url(${attachIcon})`
          }
        }),
        "Drag & drop or ",
        h(
          "span",
          { class: "hoverable " + clicker, onClick: this._fromFilePicker },
          "Select a file"
        )
      )
  );
  _actionText = "";
  _actionTextOnClick = () => new Promise(r => setTimeout(r, 10000));
  _handleClick = () => {
    this.setState({ isWorking: true });
    Promise.resolve(this._actionTextOnClick()).then(_ =>
      this.setState({ isWorking: false })
    );
  };
  _keyInput = e => this.setState({ key: e.target.value });
  _getMethod() {
    return h(
      "div",
      null,
      h("input", {
        value: this.state.key,
        class: keyGenEnter,
        placeHolder: "Enter key",
        onInput: this._keyInput
      }),
      supports.length > 1 &&
        h(
          "select",
          {
            onInput: e =>
              this.setState({ method: e.target.selectedOptions[0].value })
          },
          h("option", { value: null }, "Select an algorithm"),
          supports.map(x => h("option", { value: x.algo }, x.displayName))
        )
    );
  }
  _gotFile = () =>
    h(
      "div",
      {},
      h("div", {
        class: svgBoxDiv,
        style: {
          backgroundImage: `url(${fileIcon})`
        }
      }),
      h(extractDetails, { data: this.state.file }),
      !this.state.isWorkingisWorking ? this._getMethod() : null,
      h(
        "button",
        {
          class: [
            startAppAction,
            this.state.isWorking && !this.state.hasError ? fileHandler : ""
          ],
          onClick: !this.state.isWorking ? this._handleClick : null
        },
        (!this.state.isWorking || this.state.hasError) && this._actionText
      ),
      this.state.hasError &&
        h("div", { err: true }, this.ERROR_MESSAGES[this.state.errType])
    );
  render({}, { file, hasResult }) {
    if (hasResult) return this._gotResult();
    if (!file) return this._noFile;
    return this._gotFile();
  }
}
FileDropAcceptor.WORKER_COMMANDS = WORKER_COMMANDS;
FileDropAcceptor.WORKER_RESPONSES = WORKER_RESPONSES;
function _parseProp(k, x) {
  if (!x) return "N/A";
  if (x instanceof Date) {
    return x.toDateString();
  }
  if (k === "size") {
    return aptSize(x);
  }
  return x;
}

function extractDetails({ data: file }) {
  return h(
    "div",
    { class: fileDetails },
    ["name", "lastModifiedDate", "size", "type"].map(x =>
      h(
        "div",
        { class: itemL },
        h("div", { class: "prop k" }, x),
        h("div", { class: "prop v" }, _parseProp(x, file[x]))
      )
    )
  );
}
