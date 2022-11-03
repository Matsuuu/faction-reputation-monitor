import { LitElement, html, css } from "lit";
import "chartjs-elements";
import { characterReputationMock } from "./data-mocks";

export class CharacterReputationMonitor extends LitElement {


    static properties = {
        characterId: { type: Number, attribute: "character-id" },
        characterReputationData: { type: Object }
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
        this.characterReputationData = undefined;
    }

    updated(_changedProperties) {
        if (_changedProperties.has("characterId")) {
            this.fetchCharacterReputationData();
        }
    }

    fetchCharacterReputationData() {
        this.characterReputationData = characterReputationMock;
        // TODO
    }

    render() {
        if (!this.characterReputationData) return html``;

        return html`
      <chart-js type="bar" aspect-ratio="1">
        <chart-js-title text="${this.characterReputationData.name}" size="24" padding="5"></chart-js-title>
        <chart-js-legend align="center"></chart-js-legend>

        ${this.characterReputationData.reputations.map(rep => html`
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

customElements.define("character-reputation-monitor", CharacterReputationMonitor);
