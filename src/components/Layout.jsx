import React from "react";
import Dashboard from "../pages/Dashboard";

const Layout = ({children})=>{
    return( <>
    {<Dashboard/>}
    <div className=" container mt-3">{children}</div>
    </>
    )
}

export default Layout