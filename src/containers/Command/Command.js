import SC from "soundcloud";

import {
    PLAY_SONG_ACTION,
    PAUSE_SONG_ACTION,
    RESUME_SONG_ACTION,
    LIST_OF_SONGS_BUFFER,
    SONG_BUFFER,
    ERROR_BUFFER,
    TEXT_BUFFER,
    ADD_BUFFER_ACTION,
    CHANGE_VOLUME_ACTION
} from "../../constants";

export default class Command {
    static commands = [{
        pattern: /^find /i,
        view: LIST_OF_SONGS_BUFFER,
        action: null,
        feed: async (input) => {
            return await SC.get("/tracks", {
                q: input
            });
        }
    }, {
        pattern: /^play /i,
        view: SONG_BUFFER,
        action: PLAY_SONG_ACTION,
        feed: async (input) => {
            const songs = await SC.get("/tracks", {
                q: input
            });

            return songs[0] || null;
        }
    }, {
        pattern: /^pause/i,
        view: TEXT_BUFFER,
        action: PAUSE_SONG_ACTION,
        feed: "Paused."
    }, {
        pattern: /^resume|^play/i,
        view: TEXT_BUFFER,
        action: RESUME_SONG_ACTION,
        feed: "Resumed."
    }, {
        pattern: /^volume /i,
        view: TEXT_BUFFER,
        action: CHANGE_VOLUME_ACTION,
        feed: "Volume changed."
    }];

    static parse() {
        // @TODO: handle modifiers
    }

    static async run(input) {
        const command = this.commands.find(set => set.pattern.test(input));

        if (command) {
            const value = input.replace(command.pattern, "").trim();
            let content = command.feed || null;

            if(typeof content === "function") {
                content = await command.feed(value);
            }

            return {
                action: command.action,
                view: command.view,
                value,
                content
            };
        }

        return {
            action: ADD_BUFFER_ACTION,
            input,
            content: "No such command exists!",
            view: ERROR_BUFFER
        };
    }
}