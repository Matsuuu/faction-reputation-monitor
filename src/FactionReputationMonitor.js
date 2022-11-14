import "chartjs-elements";
import { css, html, LitElement } from 'lit';

export class FactionReputationMonitor extends LitElement {

    static properties = {
        campaignId: { type: Number, attribute: "campaign-id" },
        factionReputationData: { type: Array }
    }

    static styles = css`
        :host {
            display: flex;
            max-width: 300px; 
        }
    `

    constructor() {
        super();

        this.campaignId = undefined;
        this.factionReputationData = undefined;
    }

    updated(_changedProperties) {
        if (_changedProperties.has("campaignId")) {
            this.fetchCharacterReputationData();
        }
    }

    fetchCharacterReputationData() {
        this.factionReputationData = [];
        // TODO
    }

    render() {
        if (!this.factionReputationData) return html``;

        return this.factionReputationData.map(factionRep => html`
      <chart-js type="bar" aspect-ratio="1">
        <chart-js-title text="${factionRep.name}" size="24" padding="5"></chart-js-title>
        <chart-js-legend align="center"></chart-js-legend>

        ${factionRep.reputations.map(rep => html`
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
        `);
    }
}

customElements.define("faction-reputation-monitor", FactionReputationMonitor);
