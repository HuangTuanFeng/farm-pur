import Cookies from 'js-cookie'

export function getCookie (key) {
  return Cookies.get(key)
}

export function setCookie (key, token) {
  return Cookies.set(key, token)
}

export function removeCookie (key) {
  return Cookies.remove(key)
}

export function set_s (key, data) {
  return window.sessionStorage.setItem(key, window.JSON.stringify(data));
}

export function get_s (key) {
  var v = window.sessionStorage.getItem(key);
  if (v === null) return null
  return window.JSON.parse(v);
}

export function remove_s (key) {
  return window.sessionStorage.removeItem(key);
}