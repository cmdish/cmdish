import React from "react";

import moment from "moment";

export default class Song extends React.Component {
    render() {
        const { content, inputTime } = this.props;

        return (
            <p>
                <span style={{ opacity: 0.5 }}>{ moment(inputTime).format("HH:mm:ss") }:</span> Playing { content.title }...
            </p>
        );
    }
}
