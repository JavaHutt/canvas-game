import { constants, fieldType, eventType } from './constants';
import sounds from './sound';

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
                            break;
                        }
                        case eventType.shoot: {
                            this.animateShoot(context, event);
                            break;
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

    animateShoot(context, event) {
        console.log('shoot');
        sounds.shoot.play();
        let { startX, startY, targetX, targetY } = event;
        startX = startX * constants.squareSide + (constants.squareSide / 2);
        startY = startY * constants.squareSide + (constants.squareSide / 2);
        targetX = targetX * constants.squareSide;
        targetY = targetY * constants.squareSide  + (constants.squareSide / 2);
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(targetX, targetY);
        context.lineWidth = 5;
        context.strokeStyle = 'crimson';
        context.stroke();
    }

    animateBoom(context, boomX, boomY) {
        sounds.explosion.play();
        let frame = 0;
        const interval = setInterval(() => {
            this.makeBoom(context, boomX, boomY, frame);
            frame += 80;
        }, 200);
        if (frame === 560) {
            clearInterval(interval)
            this.restore(context, boomX, boomY);
        }
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
