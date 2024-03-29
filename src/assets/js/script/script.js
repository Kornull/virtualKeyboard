import { get, set } from '../storage/storage';
import Keyboard from '../classes/Keyboard';

const keys = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  [
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
  ],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
let lang = get('keyLang');
if (lang === null) {
  set('keyLang', 'ru');
  lang = 'ru';
}
const keyboard = new Keyboard(keys);
window.addEventListener('DOMContentLoaded', () => {
  keyboard.textDescr();
  keyboard.addInput();
  keyboard.init(lang);
});
document.addEventListener('keydown', (ev) => keyboard.addRunKey(ev));
document.addEventListener('keyup', (ev) => keyboard.addRunKey(ev));
document.addEventListener('mousedown', (ev) => keyboard.addRunKey({ code: ev.target.id, type: ev.type }));
document.addEventListener('mouseup', (ev) => keyboard.addRunKey({ code: ev.target.id, type: ev.type }));
