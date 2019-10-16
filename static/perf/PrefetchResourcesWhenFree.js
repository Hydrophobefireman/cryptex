import { h, A, Component } from "../@ui/ui-lib.js";
const timeoutFn =
  window.__fshare.__timeOutFn ||
  window.requestIdleCallback ||
  window.requestAnimationFrame ||
  (typeof Promise == "function"
    ? Promise.prototype.then.bind(Promise.resolve())
    : setTimeout);

export default class PrefetchLinkModules extends Component {
  state = { hasPrefetched: false };
  _toggle = () => this.setState(k => ({ hasPrefetched: !k.hasPrefetched }));
  _onMouseOver = () => this._toggle(timeoutFn(this.props.fetchPromise));

  render({ fetchPromise, ...props }) {
    return h(A, {
      onMouseOver: !this.state.hasPrefetched ? this._onMouseOver : null,
      ...props
    });
  }
}
