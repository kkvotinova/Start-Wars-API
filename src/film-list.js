export const episodeNum = ['I', 'II', 'III', 'IV', 'V', 'VI' ];

export function render(data) {
  const container = document.createElement('div');
  container.classList.add(
    'container',
    'd-flex',
    'justify-content-between',
    'flex-wrap',
    'py-4'
  );

  for (let i = 0; i < data.results.length; i++) {
    const filmCard = document.createElement('div');
    const filmImage = document.createElement('img');
    const filmBody = document.createElement('div');
    const episodeId = document.createElement('h5');
    const filmName = document.createElement('p');
    const detailsBtn = document.createElement('a');

    filmCard.style.width = '18%';
    filmCard.classList.add('card', 'my-2');
    filmImage.classList.add('card-img-top');
    filmBody.classList.add('card-body');
    episodeId.classList.add('card-title');
    filmName.classList.add('card-text');
    detailsBtn.classList.add('btn', 'btn-secondary');

    filmCard.append(filmImage);
    filmCard.append(filmBody);
    filmBody.append(episodeId);
    filmBody.append(filmName);
    filmBody.append(detailsBtn);

    filmImage.src = `././img/${data.results[i].episode_id}.jpg`;
    filmImage.alt = data.results[i].title;
    episodeId.textContent = 'Episode ' + episodeNum[data.results[i].episode_id - 1];
    filmName.textContent = data.results[i].title;
    detailsBtn.textContent = 'Read more...';
    detailsBtn.href = `?filmId=${i + 1}`;

    container.append(filmCard);
  }

  return container;
}
