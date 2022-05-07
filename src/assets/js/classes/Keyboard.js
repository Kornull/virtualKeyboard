import language from '../lang/lang';

export default class Keyboard {
  constructor(keys, lang) {
    this.keys = keys;
    this.lang = lang;
    this.main = document.createElement('div');
    this.main.classList.add('main');
    this.keyboard = null;
    this.key = null;
  }

  addInput() {
    this.text = document.createElement('textarea');
    const textarea = this.text;
    textarea.rows = '5';
    this.main.appendChild(this.text);
    document.body.appendChild(this.main);
  }

  init(lang) {
    this.lang = lang;
    let count = 0;
    let coutArrou = 0;
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');

    this.key = document.createElement('div');
    this.key.classList.add('keyboards__key');

    const arrows = document.createElement('div');
    arrows.classList.add('arrows');

    this.keys.forEach((element) => {
      const rows = [];
      const row = document.createElement('div');
      row.classList.add('row', `row-${count += 1}`);
      element.forEach((x) => {
        language[this.lang].forEach((i) => {
          if (i.keyCode === x) {
            this.key = document.createElement('div');
            this.key.classList.add('keyboards__key');
            this.key.id = i.keyCode.toLowerCase();
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
              rows.push(this.key.id);
            } else {
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
}
