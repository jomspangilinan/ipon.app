import logo from './logo.svg';
import './Home.css';
import * as React from "react";

import {

Grid,

} from "@material-ui/core";

function Home() {
  return (
    <>
    <div className="App">
      
      {/* <AppBar position="static" alignitems="center" style={{background: '#35B9A1', height: '80px  '}}>
        <Toolbar> */}
          <Grid container direction="row"  justify="left" wrap="wrap">
            <Grid item>
              <div>
            <img src={logo} className="App-logo-home" alt="logo" />
            </div>
            </Grid>
            <Grid item>
              <div class="large-home">
              ipon.app
              </div>
            </Grid>
          </Grid>
          {/* </Toolbar>
        </AppBar> */}
      
      
    </div>
    
    </>
  );
}

export default Home;
