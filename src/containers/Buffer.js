import React from "react";
import { observer, inject } from "mobx-react";

import buffers from "./buffers";

@inject("store") @observer
export default class Buffer extends React.Component {
    componentDidUpdate() {
        this.dom.scrollTop = this.dom.scrollHeight;
    }

    render() {
        return (
            <div className="buffer" ref={ ref => this.dom = ref }>
                { this.props.store.buffer.map((buffer, index) => (
                    React.createElement(buffers[buffer.view], {
                        content: buffer.content,
                        inputTime: buffer.inputTime,
                        key: index
                    })
                )) }
            </div>
        );
    }
}
