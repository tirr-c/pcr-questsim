import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
    <App />,
    app,
);

if (module.hot) {
    module.hot.dispose(() => {
        document.body.removeChild(app);
    });
}
