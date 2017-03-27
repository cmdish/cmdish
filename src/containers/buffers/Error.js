import React from "react";

import moment from "moment";

export default class Error extends React.Component {
    render() {
        const { content, inputTime } = this.props;

        return (
            <p style={{ color: "red" }}>
                { moment(inputTime).format("HH:ss") }: { content.text }
            </p>
        );
    }
}
