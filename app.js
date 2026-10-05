const search = document.querySelector('#search');
const cards = [...document.querySelectorAll('.game-card')];
const count = document.querySelector('#count');
const empty = document.querySelector('#empty');
const player = document.querySelector('#player');
const frame = document.querySelector('#game-frame');
const playerTitle = document.querySelector('#player-title');
const closePlayer = document.querySelector('#close-player');

function updateSearch() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const match = card.dataset.title.toLowerCase().includes(query);
    card.hidden = !match;
    if (match) visible += 1;
  });

  count.textContent = `${visible} ${visible === 1 ? 'juego' : 'juegos'}`;
  empty.hidden = visible !== 0;
}

function openGame(card) {
  const url = card.dataset.url;
  const title = card.dataset.title;

  playerTitle.textContent = title;
  frame.title = title;
  frame.src = url;
  player.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeGame() {
  frame.src = 'about:blank';
  player.hidden = true;
  document.body.style.overflow = '';
}

search.addEventListener('input', updateSearch);
cards.forEach((card) => card.addEventListener('click', () => openGame(card)));
closePlayer.addEventListener('click', closeGame);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !player.hidden) closeGame();
});