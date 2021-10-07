import Main from './Main';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db } from "./firebase";


function App() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  const refreshPage = ()=>{
      history.replace("/");
      window.location.reload();
      
   }
  useEffect(() => {
    
    const fetchUserName = async () => {
      try {
        const query = await db
          .collection("users")
          .where("uid", "==", user?.uid)
          .get();
        const data = await query.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    if (loading) return;
    if (!user) return (refreshPage());
    
    fetchUserName();
  }, [user, loading]);
  return (
    <div>
      
      {
        user 
          ? <Main/>
          : <div>{refreshPage()}</div>
      }
    </div>
  );
}

export default App;
