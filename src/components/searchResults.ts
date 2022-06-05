import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";

import { SearchController } from "../controllers/searchController";

@customElement("search-results")
class SearchResults extends LitElement {
  private search = SearchController.getInstance(this);

  @property({ type: Number })
  resultAmount: number;

  render() {
    return this.search.results.length
      ? html`
          <ul>
            ${map(
              this.search.results,
              (result) => html`
                <li>
                  <h3>${result?.title}</h3>
                  <p>${result?.excerpt}</p>
                </li>
              `
            )}
          </ul>
        `
      : undefined;
  }
}
