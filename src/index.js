import Game from './game';
import fetchData from './api/fetchData';
import JSONs from '../js';

const container = document.querySelector('#container');
const context   = container.getContext('2d');

window.addEventListener('load', async () => {
    // const data = await fetchData();

    let i = 0;
    while(i < JSONs.length) {
        context.clearRect(0, 0, 640, 640);
        const elmaBattles = new Game(JSONs[i].game);
        elmaBattles.setCanvasSize(container);
        elmaBattles.render(context);
        await new Promise(res => setTimeout(res, 1500));
        i++;
    }
    // const data = fetchData();


    // const elmaBattles = new Game(data);
    // elmaBattles.setCanvasSize(container);
    // elmaBattles.render(context);
})
