import React from "react";
import { observer, inject } from "mobx-react";
import DevTools from "mobx-react-devtools";

import Input from "./Command/Input";
import StatusBar from "./StatusBar";
import Buffer from "./Buffer";

import SC from "soundcloud";

SC.initialize({
    client_id: process.env.SOUNDCLOUD_TOKEN
});

@inject("store") @observer
export default class App extends React.Component {
    render() {
        return (
            <main>
                <StatusBar />
                <Buffer />
                <Input />
                <DevTools />
            </main>
        );
    }
}
