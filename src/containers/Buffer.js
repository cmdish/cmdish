import React from "react";
import { observer, inject } from "mobx-react";

import buffers from "./buffers";

@inject("store") @observer
export default class Buffer extends React.Component {
    render() {
        return (
            <div className="buffer">
                { this.props.store.buffer.map((buffer, index) => (
                    React.createElement(buffers[buffer.type], {
                        content: buffer.content,
                        inputTime: buffer.inputTime,
                        key: index
                    })
                )) }
            </div>
        );
    }
}
