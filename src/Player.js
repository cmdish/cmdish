export default class Player {

    constructor(metadata, token) {
        this.player = new Audio();
        this.song = null;

        this.metadata = metadata;
        this.soundcloud_token = token;

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

        this.player.addEventListener("emptied", () => {
            // clear all metadata
        });
    }

    set(song) {
        this.pause();

        this.song = song;

        this.player.src = `${song.stream_url}?client_id=${this.soundcloud_token}`;

        this.metadata.name = song.title;

        this.player.load();
    }

    play() {
        this.player.play();
    }

    pause() {
        if (!this.player.paused) {
            this.player.pause();
        }
    }
}