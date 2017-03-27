export default class Commands {
    static commands = [{
        pattern: /^find (.*)/i,
        feed: async (input) => {
            return await SC.get('/tracks', {
                q: input
            });
        }
    }];

    static parse(text) {
        // @TODO: handle modifiers
    }

    static get(input) {
        const command = this.commands.find(set => set.pattern.test(input));

        if(command) {
            const content = input.match(command.pattern)[1];

            return command.feed(content);
        }

        return null;
    }
}