import React from 'react';
import ReactDOM from 'react-dom';

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
    <div />,
    app,
);

if (module.hot) {
    module.hot.dispose(() => {
        document.body.removeChild(app);
    });
}
