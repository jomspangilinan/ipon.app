import React, { Component, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db,app,CurrentUser } from "../firebase";
import * as utils from "../Util";
import Transaction from './Transaction';
import { DataGrid } from "@mui/x-data-grid";


function History() {
    const [user, loading, error] = useAuthState(auth);
    const [history_, setHistory_] = useState([]);
    const history = useHistory();
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Transaction Name', width: 200 },
        { field: 'price', headerName: 'Price', width: 150 },
        {
          field: 'date',
          headerName: 'Date',
          width: 200,
        },
        { field: 'type', headerName: 'Type', width: 150 },
        
      ];
      
    useEffect(() => {
    
        const fetchUserName = async () => {
          try {
            const query = await db
              .collection("users")
              .where("uid", "==", user?.uid)
              .get();
            const data = await query.docs[0].data();
            
            
          } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
          }
        };
        if (loading) return;
        if (!user) return history.replace("/");
        

        app.database().ref('Transactions/' + user?.uid).on("value", data => {
            console.log(data.val());
            if(data.val() !== null)
            {
            const eachExpense = utils.eachExpense(data.val());
            const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, user);
            
            setHistory_(thisUsersExpenses);
            
           }
          });

        fetchUserName();
      }, [user, loading,
        history]);

        
  return (
    //     <div className="latestTransactions">
    //     <p>Latest Transactions</p>
    //     <ul>
    //         {
                
    //             Object.keys(history_).map((id) => (
    //                 <Transaction key={id}
    //                     type={history_[id].value.type}
    //                     name={history_[id].value.name}
    //                     price={history_[id].value.price}
    //                 />
    //             ))
    //         }
    //     </ul>
    // </div>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={
            [Object.keys(history_).map((id) => (
              {
                  id: id,
                  name: history_[id].value.name,
                  price: history_[id].value.type === 'income' ?  +1 * parseFloat(history_[id].value.price) : -1 * parseFloat(history_[id].value.price),
                  date: history_[id].value.date,
                  type: history_[id].value.type,
              }
          ))][0]
        }
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[100]}
        checkboxSelection
      />
      

    </div>
  );
}

export default History;