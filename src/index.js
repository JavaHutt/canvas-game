import Game from './game';
import fetchData from './api/fetchData';
import JSONs from '../js';

const container = document.querySelector('#container');
const context   = container.getContext('2d');

window.addEventListener('load', async () => {
    let i = 0;
    while(i < JSONs.length) {
        context.clearRect(0, 0, 640, 640);
        const elmaBattles = new Game(JSONs[i].game);
        elmaBattles.setCanvasSize(container);
        elmaBattles.render(context);
        await new Promise(res => setTimeout(res, 1500));
        i++;
    }

    /*
    const data ={"players":{"pacman":{"id":"35e802c7-c445-4cd1-9484-5247d0b579b0","name":"pacman","x":1,"y":1,"direction":"down"},"pacman2":{"id":"1fb8bbd6-865f-457b-9e33-6634234fdfc0","name":"pacman2","x":8,"y":8,"direction":"up"}},"geometry":[[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]],"player_output":{"pacman":"forward","pacman2":"forward"}};
    // const data = fetchData();
    const elmaBattles = new Game(data);
    elmaBattles.setCanvasSize(container);
    elmaBattles.render(context);*/


    // const elmaBattles = new Game(data);
    // elmaBattles.setCanvasSize(container);
    // elmaBattles.render(context);
})
