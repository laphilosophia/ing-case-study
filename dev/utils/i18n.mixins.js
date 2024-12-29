/* eslint-disable no-unused-vars */
import i18next, {t} from 'i18next';
import backend from 'i18next-xhr-backend';
import cookies from 'js-cookie';
import {LitElement} from 'lit';
import {config} from '../config';

export const i18nMixin = (baseClass) =>
  class extends baseClass {
    firstUpdated() {
      i18next.on('initialized', (options) => {
        this.requestUpdate();
      });

      i18next.on('languageChanged', (options) => {
        this.requestUpdate();
      });

      if (!i18next.isInitialized) {
        i18next.use(backend);

        i18next.init({
          lng: cookies.get(config.langCookieName) ?? 'en',
          // eslint-disable-next-line no-undef
          debug: process.env.NODE_ENV === 'development',
          defaultNS: 'messages',
          ns: ['messages'],
          fallbackLng: 'en',
          backend: {
            loadPath:
              this.languageResources || '/assets/locales/{{lng}}/{{ns}}.json',
          },
          detection: {
            order: ['cookie'],
            caches: ['cookie'],
            lookupCookie: config.langCookieName,
            cookieOptions: {path: '/', sameSite: 'strict', secure: false},
          },
        });
      }

      super.firstUpdated && super.firstUpdated();
    }

    changeLanguage(lang) {
      i18next.changeLanguage(lang);
    }
  };

export const LitElementI18N = i18nMixin(LitElement);

export {t};
