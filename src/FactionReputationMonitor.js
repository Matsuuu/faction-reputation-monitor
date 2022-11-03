import "chartjs-elements";

import { css, html, LitElement } from 'lit';

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
        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <section>
              ${this.renderChart()}
            </section>
    `;
    }

    renderChart() {

        return html`
      <chart-js type="bar" aspect-ratio="1">
        <chart-js-title text="Foo" size="24" padding="5"></chart-js-title>

        <chart-js-dataset label="Data">
            <chart-js-data label="HTML" data="15"></chart-js-data>
            <chart-js-data label="Javascript" data="10"></chart-js-data>
            <chart-js-data label="CSS" data="8"></chart-js-data>
        </chart-js-dataset>

      </chart-js>
  `;

    }
}
