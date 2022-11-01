import "chartjs-elements";

import { css, html, LitElement } from 'lit';

/**
 * @typedef Character
 * @property { number } id
 * @property { string } name
 * @property { string } description
 * @property { boolean } active
 * @property { boolean } npc
 * */

/**
 * @typedef Faction
 * @property { number } id
 * @property { string } name
 * @property { string } symbol_filepath
 * @property { string } description
 * */

/**
 * @typedef FactionToCharacterReputation
 * @property { number } faction_id
 * @property { number } character_id
 * @property { number } reputation
 * */

/**
 * @typedef FactionToFactionReputation
 * @property { number } faction_id
 * @property { number } target_faction_id
 * @property { number } reputation
 * */

/**
 * @type FactionToCharacterReputation[]
 * */
const factionToCharacterReputations =
    [
        { faction_id: 1, character_id: 1, reputation: 39 },
        { faction_id: 1, character_id: 2, reputation: 22 },
        { faction_id: 1, character_id: 3, reputation: 31 },
        { faction_id: 2, character_id: 1, reputation: 14 },
        { faction_id: 2, character_id: 2, reputation: 43 },
        { faction_id: 2, character_id: 3, reputation: 25 },
        { faction_id: 3, character_id: 1, reputation: 6 },
        { faction_id: 3, character_id: 2, reputation: 5 },
        { faction_id: 3, character_id: 3, reputation: 4 },
        { faction_id: 4, character_id: 1, reputation: 6 },
        { faction_id: 4, character_id: 2, reputation: 5 },
        { faction_id: 4, character_id: 3, reputation: 4 },
    ]

/**
 * @type FactionToFactionReputation[]
 * */
const factionToFactionReputations =
    [
        { faction_id: 1, target_faction_id: 2, reputation: 22 },
        { faction_id: 1, target_faction_id: 3, reputation: 31 },
        { faction_id: 1, target_faction_id: 4, reputation: 31 },
        { faction_id: 2, target_faction_id: 1, reputation: 14 },
        { faction_id: 2, target_faction_id: 3, reputation: 25 },
        { faction_id: 2, target_faction_id: 4, reputation: 25 },
        { faction_id: 3, target_faction_id: 1, reputation: 6 },
        { faction_id: 3, target_faction_id: 2, reputation: 5 },
        { faction_id: 3, target_faction_id: 4, reputation: 4 },
        { faction_id: 4, target_faction_id: 1, reputation: 13 },
        { faction_id: 4, target_faction_id: 2, reputation: 8 },
        { faction_id: 4, target_faction_id: 3, reputation: 5 },
    ]

export class FactionReputationMonitor extends LitElement {
    static get styles() {
        return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--faction-reputation-monitor-text-color, #000);
      }

        section {
            display: flex;
        }
    `;
    }

    static get properties() {
        return {
            factions: { type: Array },
            characters: { type: Array },
            factionToCharacterReputations: { type: Array },
            factionToFactionReputations: { type: Array },
        };
    }

    constructor() {
        super();
        this.factions = [
            { id: 1, name: "Faction number 1" },
            { id: 2, name: "Faction number 2" },
            { id: 3, name: "Faction number 3" },
            { id: 4, name: "Faction number 4" },
        ];
        /** @type { Character[] } */
        this.characters = [
            { id: 1, name: "Karuna", description: "", active: true, npc: false },
            { id: 2, name: "Killian", description: "", active: true, npc: false },
            { id: 3, name: "Autismus Maximus", description: "", active: true, npc: false },
        ]
        this.factionToCharacterReputations = factionToCharacterReputations;
        this.factionToFactionReputations = factionToFactionReputations;
    }

    /**
     * @param {number} charId
     */
    characterIdToData(charId) {
        return this.characters.filter(char => char.id === charId)[0];
    }

    /**
     * @param {number} factionId
     */
    factionIdToData(factionId) {
        return this.factions.filter(fact => fact.id === factionId)[0];
    }

    render() {
        return html`
            <section>
              ${this.renderCharacterReputations()}
            </section>
    `;
    }

    renderCharacterReputations() {

        return this.factionToCharacterReputations.map((rep) => {
            return html`
      <chart-js type="bar" aspect-ratio="1">
        <chart-js-title text="${rep.character_id}" size="24" padding="5"></chart-js-title>

        <chart-js-dataset label="Data">
            <chart-js-data label="HTML" data="15"></chart-js-data>
            <chart-js-data label="Javascript" data="10"></chart-js-data>
            <chart-js-data label="CSS" data="8"></chart-js-data>
        </chart-js-dataset>

      </chart-js>

        `})
    }
}
