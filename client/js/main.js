// import * as layout from './layout'
// console.log('layout', layout)
// import * as inputsConfig from './inputsConfig'

import { parseRequestUrl } from './utils';
import HomeScreen from './screens/HomeScreen';

const routes = {
  '/': HomeScreen
};


const router = async () => {
  // showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  // console.log(request);
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  // const header = document.getElementById('header-container');
  // header.innerHTML = await Header.render();
  // await Header.after_render();
  const main = document.getElementById('container');
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  // hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);