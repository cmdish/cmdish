import { action, observable } from "mobx";

import {
    PLAY_SONG_ACTION,
    PAUSE_SONG_ACTION,
    RESUME_SONG_ACTION,
    TEXT_BUFFER,
    ADD_BUFFER_ACTION
} from "../constants";

import Command from "../containers/Command/Command";
import Player from "../Player";

export default class Store {
    @observable ready = true;
    @observable buffer = [];

    @observable song = {
        name: null,
        paused: false,
        playing: false,
        ended: false,
        currentTime: 0,
        duration: 0
    };

    player = new Player(this.song, process.env.SOUNDCLOUD_TOKEN);

    @action addBuffer(view, content) {
        this.buffer.push({
            view,
            content,
            inputTime: Date.now()
        });
    }

    @action dispatchAction(action, input, content, view) {
        console.log(action, input, content);

        if(action === PLAY_SONG_ACTION) {
            if(content) {
                this.player.set(content);
                this.player.play();

                this.addBuffer(view, content);
            } else {
                this.addBuffer(TEXT_BUFFER, `No results has been found for: ${input}`);
            }
        }

        if(action === PAUSE_SONG_ACTION) {
            this.player.pause();

            this.addBuffer(view, content);
        }

        if(action === RESUME_SONG_ACTION) {
            this.player.play();

            this.addBuffer(view, content);
        }

        if(action === ADD_BUFFER_ACTION) {
            this.addBuffer(view, content);
        }
    }

    @action dispatchCommand = async (input) => {
        this.ready = false;

        this.addBuffer(TEXT_BUFFER, input);

        const result = await Command.run(input);

        console.log("Command.run", result);

        if(result.action) {
            this.dispatchAction(result.action, result.value, result.content, result.view);
        }

        this.ready = true;
    }
};
