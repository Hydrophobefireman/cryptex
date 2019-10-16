function getDefault(mod) {
  return mod.default;
}
export const FileEncryptorLazy = {
  promise: () =>
    import("../components/FileEncryptor/index.js").then(getDefault),
  name: "File Encryptor"
};

export const FileDecryptorLazy = {
  promise: () =>
    import("../components/FileDecryptor/index.js").then(getDefault),
  name: "File Decryptor"
};

export const FileDropAcceptorLazy = {
  promise: () =>
    import("../components/FileDropAcceptor/index.js").then(getDefault),
  name: "Common"
};

export const WorkerListenerLazy = {
  promise: () => import("../workerListener.js").then(getDefault),
  name: "WorkerListener"
};
