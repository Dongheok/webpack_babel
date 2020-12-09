// css-loader,style-loader 필요
import './app.css';
// file-loader or url-loader 필요
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
   document.body.innerHTML = `
  <img src="${nyancat}" />`;
});

console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(api.domain);
