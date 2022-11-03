import "chartjs-elements";

import { css, html, LitElement } from 'lit';
import { factionReputationsMock } from "./data-mocks";

export class FactionReputationMonitor extends LitElement {

    static properties = {
        factionId: { type: Number, attribute: "faction-id" },
        factionReputationData: { type: Object }
    }

    static styles = css`
        :host {
            display: flex;
            max-width: 300px; 
        }
    `

    constructor() {
        super();

        this.characterId = undefined;
        this.factionReputationData = undefined;
    }

    updated(_changedProperties) {
        if (_changedProperties.has("factionId")) {
            this.fetchCharacterReputationData();
        }
    }

    fetchCharacterReputationData() {
        this.factionReputationData = factionReputationsMock;
        // TODO
    }

    render() {
        if (!this.factionReputationData) return html``;

        return html`
      <chart-js type="bar" aspect-ratio="1">
        <chart-js-title text="${this.factionReputationData.name}" size="24" padding="5"></chart-js-title>
        <chart-js-legend align="center"></chart-js-legend>

        ${this.factionReputationData.reputations.map(rep => html`
            <chart-js-dataset label="${rep.faction.name}">
            <chart-js-data 
                border-color="${rep.faction.hex_color}" 
                background-color="${rep.faction.hex_color + '66'}" 
                label="Reputation" 
                data="15"
                border-width="2"
            ></chart-js-data>
            </chart-js-dataset>
        `)}

      </chart-js>
        `;
    }
}

customElements.define("faction-reputation-monitor", FactionReputationMonitor);
