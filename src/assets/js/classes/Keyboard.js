/* eslint-disable no-param-reassign */
import language from '../lang/lang';
import { get, set } from '../storage/storage';

let countCaps = 0;
export default class Keyboard {
  constructor(keys, lang) {
    this.keys = keys;
    this.lang = lang;
    this.main = document.createElement('div');
    this.main.classList.add('main');
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.key = null;
    this.keyLang = [];
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
            this.key.id = i.keyCode;
            // add style func btn
            if (this.key.id.match(/Space/)) { this.key.style.width = '310px'; }
            if (this.key.id.match(/CapsLock/)) { this.key.classList.add('keyboards__key--caps'); }
            if (this.key.id.match(/Backspace|Shift|Enter/)) { this.key.style.width = '100px'; }
            if (this.key.id.match(/Alt|Meta|Control/)) { this.key.style.width = '68px'; }
            if (this.key.id.match(/Caps|Enter/)) { this.key.style.width = '80px'; }
            if (this.key.id.match(/Arrow/)) {
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

  // click key mouse/keyboard
  addRunKey(ev) {
    this.text.focus();

    let cursorPos = this.text.selectionStart;
    const left = this.text.value.slice(0, cursorPos);
    const right = this.text.value.slice(cursorPos);

    if (ev.stopPropaganation) ev.stopPropaganation();
    const { code, type } = ev;

    this.btns.forEach((x) => {
      // checking for btns
      if (x.id === code) {
        if (type.match(/keydown|mousedown/)) {
          if (type.match(/down/)) {
            if (type.match(/keydown/)) {
              if (code.match(/Backspa|Delete/)) {
                // eslint-disable-next-line no-unused-expressions
                ev === true;
              } else {
                ev.preventDefault();
              }
            }

            // write to textarrea

            x.classList.add('active');
            if (x.id.match(/Key|Dig|Bracket|Slash|Backslash|Comma|Period|Quote|Semi|Arrow|Equal|Min|Backquote/)) {
              cursorPos += 1;
              this.text.value = `${left}${x.textContent}${right}`;
              this.text.setSelectionRange(cursorPos, cursorPos);
            }
            if (x.id.match(/Tab/)) {
              cursorPos += 4;
              this.text.value = `${left}    ${right}`;
              this.text.setSelectionRange(cursorPos, cursorPos);
            }
            if (x.id.match(/Ent/)) {
              cursorPos += 1;
              this.text.value = `${left}\n${right}`;
              this.text.setSelectionRange(cursorPos, cursorPos);
            }

            if (x.id.match(/Space/)) {
              cursorPos += 1;
              this.text.value = `${left} ${right}`;
              this.text.setSelectionRange(cursorPos, cursorPos);
            } if (type.match(/mousedown/)) {
              if (x.id.match(/Backspace/)) {
                cursorPos -= 1;
                if (cursorPos < 1) {
                  cursorPos = 0;
                }
                this.text.value = this.text.value.slice(0, cursorPos) + right;
                this.text.setSelectionRange(cursorPos, cursorPos);
              }
              if (x.id.match(/Delete/)) {
                this.text.value = left + this.text.value.slice(cursorPos + 1);
                this.text.setSelectionRange(cursorPos, cursorPos);
              }
            }
            if (x.id.match(/Caps/)) {
              countCaps += 1;
              this.capsText(countCaps);
              if (countCaps % 2 === 0) {
                countCaps = 0;
              }
            }
            if (x.id.match(/Shift/)) {
              if (countCaps === 1) {
                this.textUpLow('keyup');
              } else {
                this.textUpLow(type);
              }
            }

            //  switch language
            if (x.id.match(/Control|Alt/)) {
              this.keyLang.push(code);
            }
          }
        } else if (type.match(/up/)) {
          if (this.keyLang.length === 2) {
            this.swichLang();
          }
          // clear the language switching array
          this.keyLang = [];

          if (x.id.match(/Shift/)) {
            if (countCaps === 1) {
              this.textUpLow('keydown');
            } else {
              this.textUpLow(type);
            }
          }
          x.classList.remove('active');
          if (countCaps % 2 !== 0) {
            if (x.id.match(/Caps/)) x.classList.add('active');
          } else {
            x.classList.remove('active');
          }
        }
      }
    });
  }

  textUpLow = (t) => {
    // upper/lower text
    this.btns.forEach((j) => {
      language[this.lang].forEach((e) => {
        if (j.id.match(/Key|Dig|Bracket|Slash|Backslash|Backquote|Comma|Period|Quote|Semi|Equal|Min/)) {
          if (j.id === e.keyCode) {
            if (t.match(/down/)) {
              j.innerHTML = e.shift;

              // if capslock is pressed
              if (countCaps === 1 && this.lang === 'en') {
                if (j.id.match(/Digit|Min|Equ|Bracket|Comma|Period|Quote|Semi|Slash|Backslash|Backquote/)) j.innerHTML = e.shift;
                if (j.id.match(/Key/)) j.innerHTML = e.shift;
                if (j.id.match(/Digit|Min|Equ|Backslash|Slash|Backquote|Comma|Period|Bracket/)) j.innerHTML = e.small;
              } else if (countCaps === 1 && this.lang === 'ru') {
                if (j.id.match(/Key|Backquote|Bracket|Comma|Period|Quote|Semi/)) j.innerHTML = e.shift;
                if (j.id.match(/Digit|Min|Equ|Backslash|Slash/)) j.innerHTML = e.small;
              }
            } else if (t.match(/up/)) {
              j.innerHTML = e.small;

              // if capslock is pressed
              if (countCaps === 1 && this.lang === 'en') {
                if (j.id.match(/Key/)) j.innerHTML = e.small;
                if (j.id.match(/Digit|Min|Equ|Backslash|Slash|Backquote|Comma|Period|Bracket/)) j.innerHTML = e.shift;
              } else if (countCaps === 1 && this.lang === 'ru') {
                if (j.id.match(/Key|Backquote|Bracket|Comma|Period|Quote|Semi/)) j.innerHTML = e.small;
                if (j.id.match(/Digit|Min|Equ|Backslash|Slash/)) j.innerHTML = e.shift;
              }
            }
          }
        }
      });
    });
  };

  // capslock run
  capsText = (n) => {
    this.btns.forEach((j) => {
      language[this.lang].forEach((e) => {
        if (this.lang === 'ru') {
          if (j.id.match(/Key|Bracket|Comma|Period|Quote|Semi|Backquote/)) {
            if (j.id === e.keyCode) {
              if (n % 2 !== 0) {
                j.innerHTML = e.shift;
              } else {
                j.innerHTML = e.small;
              }
            }
          }
        } else if (j.id.match(/Key/)) {
          if (j.id === e.keyCode) {
            if (n % 2 !== 0) {
              j.innerHTML = e.shift;
            } else {
              j.innerHTML = e.small;
            }
          }
        }
      });
    });
  };

  // switch language
  swichLang = () => {
    if (get('keyLang') === 'ru') {
      set('keyLang', 'en');
      this.init(get('keyLang'));
    } else {
      set('keyLang', 'ru');
      this.init(get('keyLang'));
    }
  };

  // description keyboard
  textDescr() {
    const description = document.createElement('div');
    description.classList.add('description');

    description.innerHTML = `This keyboard was created in Linux system,<br>
    switch language with Ctrl+Alt keys.`;
    this.main.appendChild(description);
  }
}
