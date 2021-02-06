import { constants, fieldType } from './constants';

export default class Game {
    constructor(data) {
        this.data = data;
        this.image = {
            wall: new Image(),
            field: new Image(),
            player: new Image(),
        }
        this.image.wall.src = './assets/images/discarded/tile04.png';
        this.image.wall.alt = 'wall';

        this.image.field.src = './assets/images/Backgrounds/tileable/factory64.png';
        this.image.field.alt = 'wall';

        this.image.player.src = './assets/images/top-down-shooter-ship/PNG/sprites/ship_02/_0000_Layer-1.png';
        this.image.player.alt = 'player';
        this.image.player.width = '64px';
        this.image.player.height = '64px';
        
    }

    setCanvasSize(container) {
        const { geometry } = this.data;
        container.width = geometry.length * constants.squareSide;
        container.height = geometry[0].length * constants.squareSide;
        
    }
    render(context) {
        const { geometry } = this.data;        
        this.image.wall.onload = () => {
            this.image.field.onload = () => {
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
                this.image.player.onload = () => {
                    context.save();
                    // context.translate(5 * constants.squareSide + 32 , 5 * constants.squareSide + 32);
                    // context.rotate(45 * Math.PI / 180);
                    context.drawImage(this.image.player, 5 * constants.squareSide, 5 * constants.squareSide, constants.squareSide, constants.squareSide);
                    context.restore();
                }
            }
        }
        
    }
}