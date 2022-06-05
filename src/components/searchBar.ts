import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("search-bar")
class SearchBar extends LitElement {
  private _submitSearch(e: KeyboardEvent) {
    const target = <HTMLInputElement>e.target;

    if (e.key === "Enter") {
      this.dispatchEvent(
        new CustomEvent("submitSearch", {
          bubbles: true,
          composed: true,
          detail: { value: target.value },
        })
      );
    }
  }

  render() {
    return html` <input type="text" @keypress=${this._submitSearch} /> `;
  }
}
