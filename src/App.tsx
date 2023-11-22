import React from 'react';
import Main from './pages/_main';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

library.add(fab);

function App() {
    return (
  
            <Provider store={store}>
                <Main />
            </Provider>

    );
}

export default App;
