import { createContext, useState } from "react";
import PropTypes from 'prop-types'; // Import prop types

export const CreadentialsContext=createContext();

export const CredentialscontextProvider=({children})=>{
    const [name,setName]=useState('');
return <CreadentialsContext.Provider value={{
name,
setName
}}>
{children}
</CreadentialsContext.Provider>
}

CredentialscontextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is provided and is a React node
};