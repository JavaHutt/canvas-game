import Game from './game';
import fetchData from './api/fetchData';

const container = document.querySelector('#container');
const context   = container.getContext('2d');

window.addEventListener('load', async () => {
    const data = await fetchData();

    const elmaBattles = new Game(data);
    elmaBattles.setCanvasSize(container);
    elmaBattles.render(context);
})
