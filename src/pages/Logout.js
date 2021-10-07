
import React, {  useState } from "react";
import { logout } from "../firebase";

function Logout() {
    return (
      <div className="Logout">
        {logout()}
      </div>
    );
}

export default Logout;