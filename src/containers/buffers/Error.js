import React from "react";

import moment from "moment";

export default class Error extends React.Component {
    render() {
        const { content, inputTime } = this.props;

        return (
            <p style={{ color: "red" }}>
                <span style={{ opacity: 0.5 }}>{ moment(inputTime).format("HH:mm:ss") }:</span> { content }
            </p>
        );
    }
}
