export default class Player {

    // @todo: store buffering informations from waiting/loadstart/canplay/canplaythrough events etc

    constructor(metadata, token) {
        this.player = new Audio();
        this.song = null;

        this.metadata = metadata;
        this.soundcloud_token = token;

        this.player.addEventListener("volumechange", () => {
            this.metadata.volume = this.player.volume;
        });

        this.player.addEventListener("timeupdate", () => {
            this.metadata.currentTime = this.player.currentTime;
        });

        this.player.addEventListener("ended", () => {
            this.metadata.ended = this.player.ended;
        });

        this.player.addEventListener("durationchange", () => {
            this.metadata.duration = this.player.duration;
        });

        this.player.addEventListener("pause", () => {
            if(this.player.paused) {
                this.metadata.playing = false;
            }
        });

        this.player.addEventListener("play", () => {
            this.metadata.playing = true;
        });

        // @todo: handle errors
        this.player.addEventListener("emptied", () => {});
        this.player.addEventListener("error", () => {});
    }

    set(song) {
        this.pause();

        this.song = song;

        this.metadata.name = song.title;

        this.player.src = `${song.stream_url}?client_id=${this.soundcloud_token}`;
        this.player.load();
    }

    play() {
        this.player.play();
    }

    setVolume(value) {
        this.player.volume = value/100;
    }

    setTime(input) {
        let number = +input.replace("%", "");

        if(input.match("%")) {
            number = this.metadata.duration * number / 100;
        }

        this.player.currentTime = number;
    }

    pause() {
        if (!this.player.paused) {
            this.player.pause();
        }
    }
}