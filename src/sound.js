class Sound {
    constructor(src) {
        this.src = src;
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.play();
    }
}

const sounds = {
    explosion: new Sound('assets/images/Sounds/explode.ogg'),
    shoot: new Sound('assets/images/Sounds/kill_shoot.ogg'),
}

export default sounds;