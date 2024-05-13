import React, { createContext, useState } from 'react';

// Create the context
const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
    const [role, setRole] = useState(sessionStorage.getItem('role') || null);
    const [userid, setUserid] = useState(sessionStorage.getItem('userid') || null);

    // Function to update token
    const updateToken = (newrole,newUserid) => {
        sessionStorage.setItem('role', newrole);
        sessionStorage.setItem('userid', newUserid);
        setRole(newrole);
        setUserid(newUserid);
    };

    return (
        <TokenContext.Provider value={{ role,userid, updateToken }}>
            {children}
        </TokenContext.Provider>
    );
};

// Custom hook to use the token context
export const useToken = () => {
    const context = React.useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};
