export function set(name, lang) {
  localStorage.setItem(name, JSON.stringify(lang));
}

export function get(name) {
  return JSON.parse(localStorage.getItem(name));
}
