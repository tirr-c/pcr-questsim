import React from 'react';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

Promise.all([
    import(/* webpackPreload: true */ 'react-dom').then(module => module.default),
    import(/* webpackPreload: true */ './App').then(module => module.default),
]).then(([ReactDOM, App]) => {
    ReactDOM.render(
        <App />,
        app,
    );

    if (module.hot) {
        module.hot.dispose(() => {
            ReactDOM.unmountComponentAtNode(app);
            document.body.removeChild(app);
        });
    }
});
