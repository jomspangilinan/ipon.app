import React, { Component, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db,app,CurrentUser } from "../firebase";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import * as utils from "../Util";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
Button,
TextField,
Grid,
Paper,
Link,

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Transaction from './Transaction';
import { Bar, Chart } from "react-chartjs-2";

const rand = () => Math.round(Math.random() * 20 - 10);


const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
  color: 'common.white',
  bgcolor: '#FBBD14',
  '&:hover': {
    bgcolor: '#C99200',
  },
};


function Overview() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
 
  const [transactionType_, setTransactionType_] = useState("");
  const [transactionName_, setTransactionName_] = useState("");
  const [price_, setPrice_] = useState("");
  const [date_, setDate_] = useState(new Date());
  const [day_, setDay_] = useState("");
  const [money_, setMoney_] = useState("");
  const [test_array, setTest_array] = useState([]);
  const [history_, setHistory_] = useState([]);
  const [expenseData_, setExpenseData_] = useState({});

  const [data_expense, setData_expense] = useState({});


  const [dateFilter_, setDateFilter_] = useState(new Date());

  
 

  const handleChangeTest_array_ = (event) => {
    setTest_array(event.target.value);
  };

  const handleChangeTransactionType_ = (event) => {
    setTransactionType_(event.target.value);
  };
  const handleChangeTransactionName_ = (event) => {
    setTransactionName_(event.target.value);
  };
  const handleChangePrice_ = (event) => {
    setPrice_(event.target.value);
  };

  const handleChangeDate_ = (newValue) => {
    setDate_(newValue);
  };
  const handleChangeDay_ = (event) => {
    setDay_(event.target.value);
  };
  const handleChangeMoney_ = (event) => {
    setMoney_(event.target.value);
  };

  const handleChangeDateFilter_ = (newValue) => {
    var first = new Date(Number(newValue.getUTCFullYear()), Number(newValue.getUTCMonth()), Number(newValue.getUTCDate()) );
  var last = new Date(Number(newValue.getUTCFullYear()), Number(newValue.getUTCMonth()), Number(newValue.getUTCDate()) - 6);
  var dates_exported_1 = getDates(last, first);
  app.database().ref('Transactions/' + user?.uid).on("value", data => {
    const eachExpense = utils.eachExpense(data.val());
    const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, user);
    
   
      // console.log([Object.keys(dates_exported_1).map((id) => (
      //   utils.ExpensesInDate_(
      //     eachExpense,
      //     user,
      //     dates_exported_1[id]).map(elem => Number(elem.value.price)).reduce(function(previousValue, currentValue){
      //       return Number(previousValue) + Number(currentValue);
      //     }, 0)
      //     ))][0]);

      let A = [Object.keys(dates_exported_1).map((id) => (
        utils.IncomeInDate_(
          eachExpense,
          user,
          dates_exported_1[id]).map(elem => Number(elem.value.price)).reduce(function(previousValue, currentValue){
            return Number(previousValue) + Number(currentValue);
          }, 0)
          ))][0];
      let B = [Object.keys(dates_exported_1).map((id) => (
        utils.ExpensesInDate_(
          eachExpense,
          user,
          dates_exported_1[id]).map(elem => Number(elem.value.price)).reduce(function(previousValue, currentValue){
            return Number(previousValue) + Number(currentValue);
          }, 0)
          ))][0];
      let C = A.map((n, i) => n - B[i]);
      console.log(C);
      const data_te = {
        labels: dates_exported_1,
        datasets: [
          {
            label: 'Profit',
            data: C,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.2,
            type: 'line',
          },
          {
            type: 'bar',
            label: "Income",
            data: A,
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
          },
          {
            type: 'bar',
            label: "Expenses",
            data: B,
            backgroundColor: "rgba(155,231,91,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            //stack: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
          },
        ]
      };
      setExpenseData_(data_te);

  });
    setDateFilter_(newValue);
  };


  const [forgot, setForgot] = React.useState(false);
  const handleForgotOpen = () => {
    setForgot(true);
  };

  const handleForgotClose = () => {
    setForgot(false);
  };

  var getDates = function (startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
    }
    return dates.map(date => new Date(date).toDateString());
};



  var firstDay = new Date(Number(dateFilter_.getUTCFullYear()), Number(dateFilter_.getUTCMonth()), Number(dateFilter_.getUTCDate()) );
  var lastDay = new Date(Number(dateFilter_.getUTCFullYear()), Number(dateFilter_.getUTCMonth()), Number(dateFilter_.getUTCDate()) - 6);
  var dates_exported = getDates(lastDay, firstDay);

  const addNewTransaction = () =>
  {
  
    if(transactionName_ && transactionType_ && price_){

      const blankArray = test_array;
      blankArray.push({
          id: blankArray.length + 1,
          name: transactionName_,
          type: transactionType_,
          price: price_,
          user_id: user?.uid,
          date: date_.toDateString(),
          day: date_.getDay(),
      });
      console.log(blankArray);
      
      app.database().ref('Transactions/' + user?.uid).push({
        id: blankArray.length + 1,
        name: transactionName_,
        type: transactionType_,
        price: price_,
        user_id: user?.uid,
        date: date_.toDateString(),
        day: date_.getDay(),
    }).then((data) => {
        //success callback
        console.log('success callback');
        setTest_array(blankArray);
        setMoney_(transactionType_ === 'income' ? money_ + parseFloat(price_) : money_ - parseFloat(price_));
        setTransactionName_("");
        setTransactionType_("");
        setPrice_("");
        setDate_(new Date('2021-10-07T00:00:00'));
    }).catch((error)=>{
        //error callback
        console.log('error ' , error);
       
    });
    
    }

       
      
  };
  useEffect(() => {
    
    const fetchUserName = async () => {
      try {
        const query = await db
          .collection("users")
          .where("uid", "==", user?.uid)
          .get();
        const data = await query.docs[0].data();
        setName(data.name);
        app.database().ref('Transactions/' + user?.uid).on("value", data => {
          console.log(data.val());
          if(data.val() !== null)
          {
          const eachExpense = utils.eachExpense(data.val());
          const thisUsersExpenses = utils.currentUsersExpenses(eachExpense, user);
          
          let totalMoney = utils.totalExpense(thisUsersExpenses);
          
          const expensesToday_ = utils.expensesToday(eachExpense, user);

          setHistory_(thisUsersExpenses);
          
          setMoney_(totalMoney);
          /*
        
          */
          
            console.log([Object.keys(dates_exported).map((id) => (
              utils.ExpensesInDate_(
                eachExpense,
                user,
                dates_exported[id]).map(elem => Number(elem.value.price)).reduce(function(previousValue, currentValue){
                  return Number(previousValue) + Number(currentValue);
                }, 0)
                ))][0]);
                let A = [Object.keys(dates_exported).map((id) => (
                  utils.IncomeInDate_(
                    eachExpense,
                    user,
                    dates_exported[id]).map(elem => Number(elem.value.price)).reduce(function(previousValue, currentValue){
                      return Number(previousValue) + Number(currentValue);
                    }, 0)
                    ))][0];
                let B = [Object.keys(dates_exported).map((id) => (
                  utils.ExpensesInDate_(
                    eachExpense,
                    user,
                    dates_exported[id]).map(elem => Number(elem.value.price)).reduce(function(previousValue, currentValue){
                      return Number(previousValue) + Number(currentValue);
                    }, 0)
                    ))][0];
                let C = A.map((n, i) => n - B[i]);
                console.log(C)
                const data_te = {
                  labels: dates_exported,
                  datasets: [
                    {
                      label: 'Profit',
                      data: C,
                      fill: true,
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.2,
                      type: 'line',
                    },
                    {
                      type: 'bar',
                      label: "Income",
                      data: A,
                      backgroundColor: "rgba(255,99,132,0.2)",
                      borderColor: "rgba(255,99,132,1)",
                      borderWidth: 1,
                      hoverBackgroundColor: "rgba(255,99,132,0.4)",
                      hoverBorderColor: "rgba(255,99,132,1)",
                    },
                    {
                      type: 'bar',
                      label: "Expenses",
                      data: B,
                      backgroundColor: "rgba(155,231,91,0.2)",
                      borderColor: "rgba(255,99,132,1)",
                      borderWidth: 1,
                      //stack: 1,
                      hoverBackgroundColor: "rgba(255,99,132,0.4)",
                      hoverBorderColor: "rgba(255,99,132,1)",
                    },
                  ]
                };
            setExpenseData_(data_te);
          }
        });
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    if (loading) return;
    if (!user) return history.replace("/");
    
    fetchUserName();
  }, [user, loading,
    history]);
  return (
    <div>
      <script src="https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js"></script>
      <p class="tag-next-test">
        Welcome, {name}!
      </p>
      <p class="tag-next-balance">
        Your Balance: PHP {money_.toLocaleString()}
      </p>
      <div class="row">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
          label="Filter Weekly"
          format="dd/MM/yyyy"
          value={dateFilter_}
          onChange={handleChangeDateFilter_}
          renderInput={(params) => <TextField {...params} />}
        />
       </MuiPickersUtilsProvider>
      <div class="column"><Bar data={expenseData_}  /></div>
      </div> 

      <div class="transaction-block">
      <Fab sx={fabStyle} aria-label="add" onClick={handleForgotOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={forgot} onClose={handleForgotClose} fullWidth>
      <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2} >
            <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
          label="Date of Transaction"
          format="dd/MM/yyyy"
          value={date_}
          onChange={handleChangeDate_}
          renderInput={(params) => <TextField {...params} />}
          fullWidth
        />
       </MuiPickersUtilsProvider>
            </Grid>
          <Grid item>
          <TextField
            autoFocus
            margin="dense"
            id="t-name"
            label="Transaction Name"
            type="text"
            fullWidth
            variant="standard"
            value={transactionName_}
            onChange={(e) => setTransactionName_(e.target.value)}
          />
          </Grid>
          <Grid item>
          <TextField
            margin="dense"
            id="Price "
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={price_}
            onChange={(e) => setPrice_(e.target.value)}
          />
          </Grid>
          <Grid item>
          <FormControl fullWidth>
          <InputLabel id="type-label">Transaction type</InputLabel>  
           <Select
          labelId="type-label"
          id="type-label"
          label="Transaction Type"
          autoWidth
          value={transactionType_}
          onChange={handleChangeTransactionType_}
          >
          <MenuItem value={"income"} autoWidth>Income</MenuItem>
          <MenuItem value={"expense"} autoWidth>Expense</MenuItem>
        </Select>
        </FormControl>
          </Grid>
        </Grid>
        </DialogContent>
          <DialogActions>
            <Button onClick={handleForgotClose}>Cancel</Button>
            <Button onClick={addNewTransaction}>Add Transaction</Button>
          </DialogActions>
      </Dialog>
      </div>

      

    </div>
  );
}

export default Overview;