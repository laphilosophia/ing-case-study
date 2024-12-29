// @ts-nocheck
import {Router} from '@vaadin/router';
import {LitElement, css, html} from 'lit';
import {routes} from './routes';

import './dev/components/app-header';

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);

export class INGCaseStudy extends LitElement {
  static styles = css`
    :host {
      background-color: var(--ing-background-color, #f5f5f5);
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <slot></slot>
    `;
  }
}

window.customElements.define('ing-case-study', INGCaseStudy);
