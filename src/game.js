import { constants, fieldType } from './constants';

export default class Game {
    constructor(data) {
        this.data = data;
        this.image = {
            wall: new Image(),
            field: new Image(),
            player_one: new Image(),
            player_two: new Image(),
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
                const {geometry} = this.data;

                geometry.forEach((line, lineIdx) => {
                    line.forEach((cell, cellIdx) => {
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
                    });
                });
                context.save();
                context.drawImage(this.image.player_one, this.playerOneX * constants.squareSide, this.playerOneY * constants.squareSide, constants.squareSide, constants.squareSide);
                context.drawImage(this.image.player_two, this.playerTwoX * constants.squareSide, this.playerTwoY * constants.squareSide, constants.squareSide, constants.squareSide);
                context.restore();
            }
        }

        for (const img of Object.values(this.image)) {
            img.onload = img.onerror = onLoad;
        }
    }

    setCanvasSize(container) {
        const { geometry } = this.data;
        container.width = geometry.length * constants.squareSide;
        container.height = geometry[0].length * constants.squareSide;
        
    }
}
