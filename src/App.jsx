import React, { useState } from 'react';

import { Navbar, Footer, Routes } from './components';

const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);
    return (
        <div className={darkTheme ? 'dark' : ''}>
            <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen min-w-screen">
                <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                <Routes darkTheme={darkTheme} />
                <Footer />
            </div>
        </div>
    )
}

export default App;
