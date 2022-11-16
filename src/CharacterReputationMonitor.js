import { LitElement, html, css } from "lit";
import "chartjs-elements";

export class CharacterReputationMonitor extends LitElement {

    static properties = {
        campaignId: { type: Number, attribute: "campaign-id" },
        characterReputationData: { type: Array }
    }

    static styles = css`
        :host {
            display: flex;
            flex-wrap: wrap;
        }
    `

    constructor() {
        super();

        this.campaignId = undefined;
        this.characterReputationData = [];
    }

    updated(_changedProperties) {
        if (_changedProperties.has("campaignId")) {
            this.fetchCharacterReputationData();
        }
    }

    async fetchCharacterReputationData() {
        //this.characterReputationData = characterReputationMock;
        const origin = window.location.origin;
        this.characterReputationData = await fetch(`${origin}/api/campaigns/${this.campaignId}/characters-with-reputations`)
            .then(res => res.json());
        console.log(this.characterReputationData);
        // TODO
    }

    render() {
        if (!this.characterReputationData) return html``;

        const repsInData = this.characterReputationData.flatMap(entry =>
            entry.reputations.flatMap(rep =>
                rep.reputation
            ));
        const maxRepInCharts = Math.floor(Math.max(...repsInData) * 1.1);

        return this.characterReputationData.map(characterRep => html`
          <chart-js type="bar" aspect-ratio="1">
            <chart-js-title text="${characterRep.name}" size="24" padding="5"></chart-js-title>
            <chart-js-legend align="start" position="bottom" use-point-style></chart-js-legend>
            <chart-js-scale name="y" suggested-max="${maxRepInCharts}"></chart-js-scale>

            ${characterRep.reputations.map(rep => html`
                <chart-js-dataset label="${rep.faction.name}">
                <chart-js-data
                    border-color="${rep.faction.hex_color}"
                    background-color="${rep.faction.hex_color + '66'}"
                    label="Reputation"
                    data="${rep.reputation}"
                    border-width="2"
                ></chart-js-data>
                </chart-js-dataset>
            `)}

          </chart-js>
        `);
    }
}

customElements.define("character-reputation-monitor", CharacterReputationMonitor);
