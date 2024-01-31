import { createContext, useState } from "react";
import PropTypes from 'prop-types'; // Import prop types

export const FileContext = createContext();
export const FileContextProvider = ({ children }) => {
    const [saveFile, setSaveFile] = useState([]);
    console.log('Children', children)
    return <FileContext.Provider value={{
        saveFile,
        setSaveFile,
    }}>
        {children}
    </FileContext.Provider>
}

FileContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is provided and is a React node
};