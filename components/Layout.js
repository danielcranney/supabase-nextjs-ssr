import React, { useContext, useEffect } from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className={`wrapper`}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
