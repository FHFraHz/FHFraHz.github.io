'use strict';
function setCookie(cookieName, cookieValue, expireDate = 30) {
  let c_d = new Date();  // current date
  c_d.setTime(c_d.getTime() + (expireDate * 24 * 60 * 60 * 1000));
  let expires = 'expires=' + c_d.toUTCString();
  document.cookie =
      cookieName + '=' + cookieValue + '; ' + expires + '; path=/';
}
function getObjCookies() {
    let cookiesVar = document.cookie.split('; ');
    let objCookies = {};
    cookiesVar.forEach((cookieVar) => {
        let pair = cookieVar.split('=');
        objCookies[pair[0]] = pair[1];
    });
    return objCookies;
}
function getCookie(cookieName) {
    let objCookies = getObjCookies();
    return objCookies[cookieName] ?? undefined;
}