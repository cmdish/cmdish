import React from "react";

import { observer, inject } from "mobx-react";

@inject("store") @observer
export default class StatusBar extends React.Component {
    render() {
        return (
            <div className="status-bar">
                <pre>{ JSON.stringify(this.props.store.song, null, 2) }</pre>
            </div>
        );
    }
}
