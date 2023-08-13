import React, { useState } from 'react';

const MyContext = React.createContext();

const MyContextProvider = ({ children }) => {
  const [amount, setAmount] = useState();

  // You can set initial values or default values for `amount` here

  return (
    <MyContext.Provider value={{ amount, setAmount }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
