import 'regenerator-runtime';
import App from './views/app';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    content: document.querySelector('#mainContent'),
  });

  window.addEventListener('hashchange', () => {
    app.renderPage();
  });

  window.addEventListener('load', () => {
    app.renderPage();
  });
});
