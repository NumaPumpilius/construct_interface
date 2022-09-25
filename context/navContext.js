import { createContext, useState, useContext } from 'react';

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
    const [selectedNav, setSelectedNav] = useState('Strategies');

    return (
        <NavContext.Provider value={[selectedNav, setSelectedNav]}>
            {children}
        </NavContext.Provider>
    );
};
