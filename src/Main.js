import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import logo from './logo.svg';
import './Home.css';
import { SidebarData } from './SidebarData';
import { NavLink,BrowserRouter,Route,Switch } from 'react-router-dom';
import History from './pages/History';
import Reports from './Reports';
import Overview from './pages/Overview';
import Logout from './pages/Logout';
import { createMuiTheme,ThemeProvider  } from '@material-ui/core/styles';


const drawerWidth = 220;

const theme_prov = createMuiTheme({
  
  typography: {
    fontFamily: ['"Montserrat Medium"'].join(','),
    button:
    {
      textTransform: 'none',
      width:'90%',
      palette:
      {
        primary: '#FBBD14'
      }
    },
   },
 },
)

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#35B9A1'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: -80,
    marginRight: 36
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(0deg)"
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(180deg)"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "38px 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  },
  myComponent: {
      paddingRight: 25,
  }
});


class MiniDrawer extends React.Component {
  
  state = {
    open: true,
    anchorEl: null
  };


  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  


  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <BrowserRouter>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          fooJon={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={true}>
            <img src={logo} className="App-logo-home" alt="logo" />
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap
            >
              <div class="large-home">
              ipon.app
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <ThemeProvider theme={theme_prov}>
        <Drawer
          variant="permanent"
          className={classes.drawerOpen
          }
          classes={{
            paper: classes.drawerOpen
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} />
          <List>
            {
            SidebarData.map((text, index) => {
              return(
                <Tooltip title={text.tool} arrow placement="right-start">
                <ListItem button={true} {...{ component: NavLink, to: text.path }}>
                <ListItemIcon>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.title} />
              </ListItem>
              </Tooltip>
              );
            }
            )
          }
          </List>
              
        </Drawer>
        </ThemeProvider>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          
          <Switch>
              <Route path='/dashboard' exact component={Overview} />
              <Route path='/history' component={History} />
              <Route path='/payables' component={Reports} />
              <Route path='/logout' component={Logout} />
            </Switch>
          
        </main>
      </BrowserRouter>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
