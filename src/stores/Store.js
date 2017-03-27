import { action, observable } from "mobx";

import Commands from "../Commands";

import SC from "soundcloud";

class Store {
    @observable ready = true;
    @observable buffer = [];

    @action addBuffer(type, content) {
        this.buffer.push({
            type,
            content,
            inputTime: Date.now()
        });
    }

    @action addCommand = async (input) => {
        this.ready = false;

        this.addBuffer("text", {
            text: input
        });

        const result = await Commands.get(input);

        if(!result) {
            this.addBuffer("error", {
                text: "No such command exists!"
            });

            this.ready = true;

            return;
        }

        this.addBuffer("text", {
            text: JSON.stringify(result, null, 2)
        });

        this.ready = true;
    }
}

export default new Store();
