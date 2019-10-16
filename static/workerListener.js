import FakeSet from "@hydrophobefireman/j-utils/@build-modern/src/modules/es6/loose/Set/index.js";

export default class WorkerListener {
  /**
   *
   * @param {MessageEvent} message
   */
  _onMessage(message) {
    const { data } = message;
    console.log(data);
    this._emitSubscription(data);
  }
  _emitSubscription(data) {
    this._subscriptions.forEach(x => x(data));
  }
  /**
   * @param {(MessageEvent)=>any} cb
   */
  subscribe(cb) {
    if (typeof cb === "function") return void this._subscriptions.add(cb);
    throw new Error("not a function");
  }
  subscribeType(type, cb) {
    const fn = e => e.type === type && cb(e);
    this.subscribe(fn);
    return fn;
  }
  waitFor(messageType) {
    return new Promise(resolve => {
      let _cb;
      const cb = x => {
        this.unsubscribe(_cb);
        resolve(x);
      };
      _cb = this.subscribeType(messageType, cb);
    });
  }
  unsubscribe(cb) {
    this._subscriptions.delete(cb);
  }
  sendType(msg, type) {
    msg = { ...msg, type };
    console.log("sending=>", msg);
    return this.send(msg);
  }
  transfer(msg, transferrableArray) {
    this._worker.postMessage(msg, transferrableArray);
  }
  send(msg) {
    return this._worker.postMessage(msg);
  }
  constructor(worker) {
    this._subscriptions = new FakeSet();
    this._worker = worker || self;
    this._worker.addEventListener("message", this._onMessage.bind(this));
  }
}
