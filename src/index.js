import "../css/reset.css";
import "../css/base.css";

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "mobx-react";

import App from "./containers/App";
import stores from "./stores";

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider { ...stores }>
                <App />
            </Provider>
        </AppContainer>,
        document.getElementById("root")
    );
};

render();

if (module.hot) {
    module.hot.accept("./containers/App", render);
}
