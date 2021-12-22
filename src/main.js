// main pic add event listener
document.querySelector('.header_logo').addEventListener('click', () => window.location.href = window.location.href.split('?')[0]);

const cssPromises = {};

function loadResource(src) {
  // JavaScript module
  if (src.endsWith('.js')) {
    return import(src);
  }
  // CSS file
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  // API data
  return fetch(src).then(res => res.json());
}

const appContainer = document.querySelector('.main');
var searchParams = new URLSearchParams(location.search);
const filmId = searchParams.get('filmId');

function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
  .then(([pageModule, data]) => {
    appContainer.innerHTML = '';
    appContainer.append(pageModule.render(data));
  });
}

if (filmId) {
  renderPage(
    './film-details.js',
    `https://swapi.dev/api/films/${filmId}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
  );
} else {
  renderPage(
    './film-list.js',
    'https://swapi.dev/api/films',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
  );
}
