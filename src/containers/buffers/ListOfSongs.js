import React from "react";

import moment from "moment";

export default class ListOfSongs extends React.Component {
    render() {
        const { content, inputTime } = this.props;

        return (
            <div>
                { moment(inputTime).format("HH:ss") }:

                { content.map((song, index) => (
                    <div key={ index }>
                        - { song.id }: { song.title }
                    </div>
                )) }
            </div>
        );
    }
}
