import { ShoppingCart, GridView, LogoutSharp, LoginSharp, History } from '@mui/icons-material'
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

const Lists = ({close}) => {
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
    },
    ]

    const handleClick = () => {
        logout()
        close()
    }

    return (
        <List>
            {itemList.map((item) => {
                const { title, icon, path } = item
                return (
                    <Link key={title} to={path} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem>
                            <ListItemButton onClick={close}>
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
                    <div>
                        <Link to="/order_history" style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItemButton onClick={close}>
                                <ListItemIcon>
                                    <History />
                                </ListItemIcon>
                                <ListItemText primary="Order History" />
                            </ListItemButton>
                        </Link>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <LogoutSharp />
                            </ListItemIcon>
                            <ListItemText primary="Log out" />
                        </ListItemButton>
                    </div>
                )
                }
            </ListItem>
        </List>
    )
}

export default Lists