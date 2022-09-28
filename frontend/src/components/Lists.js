import { ShoppingCart, GridView, LogoutSharp, LoginSharp } from '@mui/icons-material'
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from '@mui/material'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { AuthState } from '../Context/AuthContext'

const Lists = () => {
    const { logout } = Logout()
    const { user } = AuthState()

    const itemList = [{
        title: 'Home',
        icon: <GridView />,
        path: '/'
    },
    {
        title: 'Cart',
        icon: <ShoppingCart />,
        path: '/cart'
    }
    ]

    const handleClick = () => {
        logout()
    }

    return (
        <List>
            {itemList.map((item) => {
                const { title, icon, path } = item
                return (
                    <Link key={title} to={path} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )
            })}
            <ListItem>
                {!user && (
                    <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LoginSharp />
                            </ListItemIcon>
                            <ListItemText primary="Log in" />
                        </ListItemButton>
                    </Link>
                )}
                {user && (
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <LogoutSharp />
                        </ListItemIcon>
                        <ListItemText primary="Log out" />
                    </ListItemButton>
                )
                }
            </ListItem>
        </List>
    )
}

export default Lists