import { React, useState } from "react"
import { makeStyles } from '@mui/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import ShopingCartIcon from '@mui/icons-material/ShoppingCart'
import MoreIcon from '@mui/icons-material/MoreVert'
import { CartState } from "../Context/Context"
import theme from "../Theme/Theme"
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    Box,
    Badge,
    Menu,
    MenuItem,
} from '@mui/material'
import { Link } from "react-router-dom"
import Lists from "./Lists"
import Logout from "./Logout"
import { AuthState } from "../Context/AuthContext"

const drawerWidth = 200

const useStyles = makeStyles({
    drawer: {
        width: drawerWidth
    },
    drawerBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerPaper: {
        width: drawerWidth
    },
    appbar: {
        height: 54,
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: [theme.palette.secondary.main]
    },
    drawerHolder: {
        display: 'flex',
        alignItems: 'center'
    }
})

const Navbar = () => {
    const { user } = AuthState()
    const { logout } = Logout()
    const [draw, setDraw] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const { cart } = CartState()
    const classes = useStyles()

    const handleDrawerOpen = () => {
        setDraw(true)
    }

    const handleDrawerClose = () => {
        setDraw(false)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    // handle logout
    const handleLogout = () => {
        logout()
        setAnchorEl(null);
    }

    return (
        <>
            {/* App Bar */}
            <AppBar position="fixed" open={true}>
                <Toolbar className={classes.appbar}>
                    <Box className={classes.drawerHolder}>
                        <IconButton edge="start" onClick={handleDrawerOpen} sx={{ mr: 2 }}>
                            <MenuIcon color="icons" />
                        </IconButton>
                        <Typography>
                            Web Store
                        </Typography>
                    </Box>
                    <Box>
                        {user && (
                            <Link to="/cart">
                            <IconButton>
                                <Badge badgeContent={cart.length} color='primary'>
                                    <ShopingCartIcon color="icons" />
                                </Badge>
                            </IconButton>
                        </Link>
                        )}
                        <IconButton
                            size="large"
                            aria-label="show more"
                            edge="end"
                            aria-controls="menu"
                            color="inherit"
                            onClick={handleMenu}
                        >
                            <MoreIcon />
                        </IconButton>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            open={Boolean(anchorEl)}
                        >
                            {user && (<MenuItem onClick={handleLogout}>Logout</MenuItem>)}
                            {!user && (
                                <div>
                                    <Link to="/login" onClick={handleClose} style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem>Login</MenuItem>
                                    </Link>
                                    <Link to="/signup" onClick={handleClose} style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem>Sign up</MenuItem>
                                    </Link>
                                </div>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            {/* Drawer for Navigation */}
            <Drawer variant="persistent" open={draw} className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                <Box className={classes.drawerBox}>
                    <Typography>
                        Hello
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                {/* List Buttons Inside Drawer */}
                <Lists />
            </Drawer>
        </>
    )
}

export default Navbar