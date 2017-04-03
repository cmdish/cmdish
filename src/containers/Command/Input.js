import React from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("store") @observer
export default class Input extends React.Component {
    @observable command = "";

    handleChange = (e) => {
        this.command = e.target.value;
    };

    handleSubmit = (e) => {
        const store = this.props.store;
        const command = this.command.trim();

        if (command.length > 0 && e.which === 13) {
            store.dispatchCommand(command);

            this.command = "";
        }
    };

    render() {
        return (
            <div className="input">
                <div>$</div>
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
