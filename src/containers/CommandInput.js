import React from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("store") @observer
export default class CommandInput extends React.Component {
    @observable command = "";

    constructor(...props) {
        super(...props);
    }

    handleChange = (e) => {
        this.command = e.target.value;
    };

    handleSubmit = (e) => {
        const store = this.props.store;
        const command = this.command.trim();

        if (command.length > 0 && e.which === 13) {
            store.addCommand(command);

            this.command = "";
        }
    };

    render() {
        return (
            <div className="input">
                <input
                    type="text"
                    placeholder="command"
                    disabled={ this.props.store.ready ? "" : "disabled" }
                    value={ this.command }
                    onChange={ this.handleChange }
                    onKeyDown={ this.handleSubmit }
                />
            </div>
        );
    }
}
