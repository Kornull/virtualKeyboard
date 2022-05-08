import language from '../lang/lang';
import { get, set } from '../storage/storage';

export default class Keyboard {
  constructor(keys, lang) {
    this.keys = keys;
    this.lang = lang;
    this.main = document.createElement('div');
    this.main.classList.add('main');
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.key = null;
    this.case = null;
  }

  addInput() {
    this.text = document.createElement('textarea');
    const textarea = this.text;
    textarea.rows = '5';
    this.main.appendChild(this.text);
    document.body.appendChild(this.main);
  }

  init(lang) {
    // new keyboard
    this.keyboard.innerHTML = '';
    this.btns = [];

    this.lang = lang;
    let count = 0;
    let coutArrou = 0;

    this.key = document.createElement('div');
    this.key.classList.add('keyboards__key');

    const arrows = document.createElement('div');
    arrows.classList.add('arrows');

    this.keys.forEach((el) => {
      const rows = [];
      const row = document.createElement('div');
      row.classList.add('row', `row-${count += 1}`);
      el.forEach((x) => {
        // create btn
        language[this.lang].forEach((i) => {
          if (i.keyCode === x) {
            this.key = document.createElement('div');
            this.key.classList.add('keyboards__key');
            this.key.id = i.keyCode.toLowerCase();
            // add style func btn
            if (this.key.id === 'space') { this.key.style.width = '510px'; }
            if (this.key.id === 'capslock') { this.key.classList.add('keyboards__key--caps'); }
            if (this.key.id.match(/backspace|shift|enter/)) { this.key.style.width = '180px'; }
            if (this.key.id.match(/alt|meta|control/)) { this.key.style.width = '68px'; }
            if (this.key.id.match(/caps|enter/)) { this.key.style.width = '140px'; }
            if (this.key.id.match(/arrow/)) {
              this.key.style.width = '53px';
              this.key.style.height = '23px';
              this.key.style.padding = '5px';
              this.key.innerHTML = i.small;
              const arrow = document.createElement('div');
              arrow.classList.add(`arrou-${coutArrou += 1}`);
              arrow.append(this.key);
              arrows.appendChild(arrow);

              // collect an array btns
              this.btns.push(this.key);
              rows.push(this.key.id);
            } else {
              // collect an array btns
              this.btns.push(this.key);

              this.key.innerHTML = i.small;
              row.appendChild(this.key);
              row.appendChild(arrows);
              rows.push(this.key.id);
            }
          }
        });

        this.keyboard.appendChild(row);
      });
      row.style.gridTemplateColumns = `repeat(${rows.length}, 1fr)`;
    });
    this.main.appendChild(this.keyboard);
  }

  addRunKey(ev) {
    this.text.focus();
    if (ev.stopPropaganation) ev.stopPropaganation();
    const { code, type } = ev;

    this.btns.forEach((x) => {
      // checking for btns
      if (x.id === code.toLowerCase()) {
        if (type.match(/keydown|mousedown/)) {
          if (type.match(/key/)) {
            ev.preventDefault();

            // write to textarrea
            const a = language[this.lang].find((el) => el.keyCode.toLowerCase() === x.id);
            x.classList.add('active');
            if (x.id.match(/key|dig|bracket|slash|comma|period|quote|semi|arrow/)) this.text.value += a.small;
            if (x.id.match(/tab/)) this.text.value += '    ';
            if (x.id.match(/ent/)) this.text.value += '\n';
            if (x.id.match(/shift/)) {
              if (get('keyLang') === 'ru') {
                set('keyLang', 'en');
                this.init(get('keyLang'));
              } else {
                set('keyLang', 'ru');
                this.init(get('keyLang'));
              }
            }
          }
        } else if (type.match(/keyup/)) {
          x.classList.remove('active');
        }
      }
    });
  }
}
