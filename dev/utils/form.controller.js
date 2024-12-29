/* eslint-disable no-unused-vars */
import {createForm, formSubscriptionItems} from 'final-form';
import {noChange, nothing} from 'lit';
import {Directive, directive, PartType} from 'lit/directive.js';

const allFormSubscriptionItems = formSubscriptionItems.reduce(
  (acc, item) => ((acc[item] = true), acc),
  {}
);

export class FormController {
  _host;
  _subscription = allFormSubscriptionItems;
  _unsubscribe;
  form;

  // https://final-form.org/docs/final-form/types/Config
  constructor(host, config, subscription) {
    (this._host = host).addController(this);
    if (subscription) {
      this._subscription = subscription;
    }
    this.form = createForm(config);
  }

  hostConnected() {
    this._unsubscribe = this.form.subscribe(() => {
      this._host.requestUpdate();
    }, this._subscription);
  }

  hostDisconnected() {
    this._unsubscribe();
  }

  // https://final-form.org/docs/final-form/types/FieldConfig
  register = (name, fieldConfig) => {
    return registerDirective(this.form, name, fieldConfig);
  };
}

class RegisterDirective extends Directive {
  _registered = false;

  constructor(partInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error(
        'The `register` directive must be used in the `element` attribute'
      );
    }
  }

  update(part, [form, name, fieldConfig]) {
    if (!this._registered) {
      form.registerField(
        name,
        (fieldState) => {
          const {blur, change, focus, value} = fieldState;
          const el = part.element;
          el.name = String(name);

          if (!this._registered) {
            el.addEventListener('blur', () => blur());
            el.addEventListener('input', (event) =>
              change(
                el.type === 'checkbox'
                  ? event.target.checked
                  : event.target.value
              )
            );
            el.addEventListener('focus', () => focus());
          }
          if (el.type === 'checkbox') {
            el.checked = value;
          } else {
            el.value = value === undefined ? '' : value;
          }
        },
        {value: true},
        fieldConfig
      );
      this._registered = true;
    }

    return noChange;
  }

  // Can't get generics carried over from directive call
  render(_form, _name, _fieldConfig) {
    return nothing;
  }
}

const registerDirective = directive(RegisterDirective);
