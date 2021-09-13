import { html } from 'htm/preact';
import State from '../State.js';
import Filters from '../components/Filters.js';
import {translate as t} from '../Translation.js';
import View from './View.js';

export default class Hashtags extends View {
  hashtags = {};

  componentDidMount() {
    State.local.get('filters').get('group').on(this.inject());
    State.group().map('hashtags', (msgs, tag) => {
      this.hashtags[tag] = true;
      this.setState({});
    });
  }

  renderView() {
    return html`
      <div class="centered-container">
        <h3>${t('hashtags')}</h3>
        <${Filters} />
        ${Object.keys(this.hashtags).length === 0 ? html`
            <p>No hashtags yet</p>
        `:''}
        ${Object.keys(this.hashtags).sort().map(hashtag => {
          return html`
            <p>
                <a href="/hashtag/${hashtag}">#${hashtag}</a>
            </p>
          `;
        })}
      </div>
    `;
  }
}
