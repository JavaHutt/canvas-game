import Scene from '../scene';

export default class Loading extends Scene {
    constructor(game) {
        super(game);

        this.nextScene = 'menu';
    }

    render(time) {
        this.game.screen.fill('#000000');
        super.render(time);
    }
}