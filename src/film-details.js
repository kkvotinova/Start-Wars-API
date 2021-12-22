import { episodeNum } from "./film-list.js";

async function getList (name, array) {
  const container = document.createElement('div');
  container.classList.add('me-5');
  const listTitle = document.createElement('h2');
  listTitle.textContent = name;
  container.append(listTitle);

  const ul = document.createElement('ul');
  for (const el of array) {
    const li = document.createElement('li');
    const obj = await fetch(el).then(res => res.json());
    li.textContent = obj.name;
    ul.append(li);
  }
  container.append(ul);

  return container;
}

export function render(data) {
  const container = document.createElement('div');
  container.classList.add('container');

  const filmCard = document.createElement('div');
  const filmRow = document.createElement('div');
  const filmLeftCol = document.createElement('div');
  const filmImg = document.createElement('img');
  const filmRightCol = document.createElement('div');
  const filmBody = document.createElement('div');
  const filmTitle = document.createElement('h1');
  const filmDecr = document.createElement('p');

  filmCard.classList.add('card', 'mb-4');
  filmRow.classList.add('row', 'g-0');
  filmLeftCol.classList.add('col-md-4');
  filmImg.classList.add('img-fluid', 'rounded-start');
  filmRightCol.classList.add('col-md-8');
  filmBody.classList.add('card-body');
  filmTitle.classList.add('card-title');

  filmCard.append(filmRow);
  filmRow.append(filmLeftCol);
  filmRow.append(filmRightCol);
  filmLeftCol.append(filmImg);
  filmRightCol.append(filmBody);
  filmBody.append(filmTitle);
  filmBody.append(filmDecr);

  filmCard.style.width = '100%';
  filmImg.src = `././img/${data.episode_id}.jpg`;
  filmTitle.textContent = 'Episode ' + episodeNum[data.episode_id - 1] + ': ' + data.title;
  filmDecr.innerHTML = `
  <p class="card-text"><b>Date Created:</b> ${data.release_date}<p>
  <p class="card-text"><b>Director:</b> ${data.director}<p>
  <p class="card-text"><b>Producer(s):</b> ${data.producer}<p>
  <p class="card-text"><b>Opening Crawl:</b> ${data.opening_crawl}<p>`;

  const btnBack = document.createElement('button');
  btnBack.textContent = 'Back to episodes';
  btnBack.classList.add('btn', 'btn-warning', 'mb-4');
  btnBack.addEventListener('click', () => window.location.href = window.location.href.split('?')[0]);

  Promise.all([
    getList('Planets', data.planets),
    getList('Species', data.species)
  ]).then(([planets, species]) => {
    const descrCard = document.createElement('div');
    descrCard.classList.add('card', 'mb-5', 'd-flex', 'flex-row', 'px-2', 'py-2');
    descrCard.style.width = '100%';

    descrCard.append(planets);
    descrCard.append(species);

    container.append(btnBack);
    container.append(filmCard);
    container.append(descrCard);
  });

  return container;
}
