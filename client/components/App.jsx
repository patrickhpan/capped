import React from 'react';

import Header from './Header';

class App extends React.Component {
    render() {
        let { children } = this.props;
        return <div id="App">
            <Header />
            {children}
        </div>
    }
}

export default App;

