import { constants, fieldType, eventType } from './constants';

export default class Game {
    constructor(data) {
        this.data = data;
        this.image = {
            wall: new Image(),
            field: new Image(),
            player_one: new Image(),
            player_two: new Image(),
            boom: new Image(),
        }
        const playerOneDirection = this.data.players[0].direction;
        const playerTwoDirection = this.data.players[1].direction;

        this.image.wall.src = './assets/images/discarded/tile04.png';
        this.image.wall.alt = 'wall';

        this.image.field.src = './assets/images/Backgrounds/tileable/factory64.png';
        this.image.field.alt = 'field';

        this.image.player_one.src = `./assets/images/player/player-1-${playerOneDirection}.png`;
        this.image.player_one.alt = 'player_one';

        this.image.player_two.src = `./assets/images/player/player-2-${playerTwoDirection}.png`;
        this.image.player_two.alt = 'player_two';

        this.image.boom.src = `./assets/images/events/explosion.png`;
        this.image.boom.alt = 'boom';

        this.playerOneX = this.data.players[0].x;
        this.playerOneY = this.data.players[0].y;

        this.playerTwoX = this.data.players[1].x;
        this.playerTwoY = this.data.players[1].y;
    }

    render(context) {        
        let counter = 0;

        const onLoad = () => {
            counter++;
            if (counter == Object.keys(this.image).length) {
                const { geometry, events } = this.data;

                geometry.forEach((line, lineIdx) => {
                    line.forEach((cell, cellIdx) => {
                        this.drawByCell(context, cell, cellIdx, lineIdx);
                    });
                });
                this.drawShip(context)
              
                events.forEach(event => {
                    switch (event.kind) {
                        case eventType.boom: {
                            this.animateBoom(context, event.x, event.y);
                        }
                    }
                });
            }
        }

        for (const img of Object.values(this.image)) {
            img.onload = img.onerror = onLoad;
        }
    }

    drawByCell(context, cell, cellIdx, lineIdx) {
        switch (cell) {
            case fieldType.wall: {
                context.drawImage(this.image.wall, cellIdx * constants.squareSide, lineIdx * constants.squareSide, constants.squareSide, constants.squareSide);
                break;
            }
            case fieldType.field: {
                context.drawImage(this.image.field, cellIdx * constants.squareSide, lineIdx * constants.squareSide, constants.squareSide, constants.squareSide);
                break;
            }
        }
    }

    animateBoom(context, boomX, boomY) {
        let frame = 0;
        setInterval(() => {
            this.makeBoom(context, boomX, boomY, frame);
            frame += 80;
            if (frame === 560) {
                frame = 0;
                this.restore(context, boomX, boomY);
            }
        }, 200);
    }

    restore(context, boomX, boomY) {
        const cell = this.data.geometry[boomY][boomX];
        this.drawByCell(context, cell, boomX, boomY);
        this.drawShip(context);
    }

    drawShip(context) {
        context.drawImage(this.image.player_one, this.playerOneX * constants.squareSide, this.playerOneY * constants.squareSide, constants.squareSide, constants.squareSide);
        context.drawImage(this.image.player_two, this.playerTwoX * constants.squareSide, this.playerTwoY * constants.squareSide, constants.squareSide, constants.squareSide);
      
    }

    makeBoom(context, x, y, sx) {
        context.drawImage(this.image.boom, sx, 0, 80, 80,
            x * constants.squareSide, y * constants.squareSide, constants.squareSide, constants.squareSide);
    }

    setCanvasSize(container) {
        const { geometry } = this.data;
        container.width = geometry.length * constants.squareSide;
        container.height = geometry[0].length * constants.squareSide;
        
    }
}
