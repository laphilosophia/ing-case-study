import '@vaadin/icons/vaadin-icons';
import {html, nothing} from 'lit';
import {LitElementI18N, t} from '../../utils/i18n.mixins';
import {dialogStyles} from './styles';

export class AppDialog extends LitElementI18N {
  static styles = dialogStyles;

  static properties = {
    title: {
      type: String,
      reflect: true,
    },
    open: {
      type: Boolean,
      reflect: true,
    },
    withForm: {
      type: Boolean,
      reflect: true,
    },
  };

  constructor(open) {
    super();
    this.open = open;
    this.title = '';
    this.withForm = false;
  }

  _keydownHandler(e) {
    if (e.code === 'Escape') {
      this._onClose();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.getRootNode().addEventListener('keydown', (e) =>
      this._keydownHandler(e)
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.getRootNode().removeEventListener('keydown', (e) =>
      this._keydownHandler(e)
    );
  }

  _onClose() {
    this.dispatchEvent(new CustomEvent('dialog-close'));
    this.requestUpdate();
  }

  _onSubmit() {
    this.dispatchEvent(new CustomEvent('dialog-submit'));
    this.requestUpdate();
  }

  render() {
    return html`
      <dialog id="dialog" ?open="${this.open}">
        <header>
          <h3>${this.title}</h3>
          <button class="close" @click="${this._onClose}">
            <vaadin-icon icon="vaadin:close-small"></vaadin-icon>
          </button>
        </header>

        <div class="content">
          <slot></slot>
        </div>

        ${this.withForm
          ? nothing
          : html`
              <nav>
                <button class="submit" @click="${this._onSubmit}">
                  ${t('messages:dialogs.delete.proceed')}
                </button>
                <button class="close" @click="${this._onClose}">
                  ${t('messages:dialogs.delete.cancel')}
                </button>
              </nav>
            `}
      </dialog>
    `;
  }
}

// @ts-ignore
customElements.define('app-dialog', AppDialog);
