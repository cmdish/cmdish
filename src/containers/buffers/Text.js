import React from "react";

import moment from "moment";

export default class Text extends React.Component {
    render() {
        const { content, inputTime } = this.props;

        return (
            <p>
                { moment(inputTime).format("HH:ss") }: { content.text }
            </p>
        );
    }
}
