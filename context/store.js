import React, { useState ,createContext, useContext } from 'react';

export const StateContext = createContext();
export const UpdateContext = createContext();

const store = (initialState) => {

  const useData = () => [useContext(StateContext), useContext(UpdateContext)];

  const provideData = ({ children }) => {
    const [state, setState] = useState(initialState);
    
    return (
      <UpdateContext.Provider value={setState}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </UpdateContext.Provider>
    )
  }

  return {provideData, useData}
}

export default store;