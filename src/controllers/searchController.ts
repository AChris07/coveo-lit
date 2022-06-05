import {
  buildSearchEngine,
  getSampleSearchEngineConfiguration,
} from "@coveo/headless";
import { ReactiveController, ReactiveControllerHost } from "lit";

import { updateHost } from "../decorators/updateHost";

export class SearchController implements ReactiveController {
  private static instance: SearchController;
  hosts: Array<ReactiveControllerHost> = [];

  private boundOnSubmitSearch: (e: CustomEvent) => void;
  private engine;

  query: String = "";
  results: Array<any> = [];

  static getInstance(host: ReactiveControllerHost): SearchController {
    if (!SearchController.instance) {
      SearchController.instance = new SearchController();
    }

    SearchController.instance.hosts.push(host);
    host.addController(SearchController.instance);

    return SearchController.instance;
  }

  constructor() {
    this.boundOnSubmitSearch = this.onSubmitSearch.bind(this);
    document.querySelectorAll("search-bar").forEach((searchBar) => {
      searchBar.addEventListener("submitSearch", this.boundOnSubmitSearch);
    });

    this.engine = buildSearchEngine({
      configuration: getSampleSearchEngineConfiguration(),
    });
    this.engine.subscribe(this.onEngineUpdate.bind(this));
    this.engine.executeFirstSearch();
  }

  @updateHost({ multiple: true })
  private onEngineUpdate() {
    // TODO: Only update host if needed - values changed require a new re-render
    const state = this.engine.state;
    this.results = state.search.results;
  }

  @updateHost({ multiple: true })
  private onSubmitSearch(e: CustomEvent) {
    const { value } = e.detail;

    this.query = value;

    // TODO: Find out how to trigger new search from query
    console.log(this.query);
  }

  hostConnected() {}
}
