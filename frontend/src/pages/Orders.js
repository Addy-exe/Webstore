import { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import { AuthState } from '../Context/AuthContext'
import SingleOrder from '../components/SingleOrder'
import theme from '../Theme/Theme'

const useStyles = makeStyles({
    ordersContainer: {
        position: 'relative',
        top: 80,
        width: '78%',
        margin: 'auto',
        [theme.breakpoints.down("tablet")]: {
            width: '84%'
        }
    },
    orderItems: {
        marginTop: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 28
    },
    empty:{
        width: 180,
        margin: 'auto',
        marginTop: '8rem'
    }
})

const Orders = () => {
    const [orders, setOrders] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user } = AuthState()

    const classes = useStyles()

    useEffect(() => {
        setLoading(false)
        const fetchProducts = async () => {
            const response = await fetch('https://webstore-mern.herokuapp.com/order_history', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            if (response.ok) {
                setOrders(json)
                setLoading(true)
            }
        }
        if (user) {
            fetchProducts()
        }
    }, [user])

    return (
        <div className={classes.ordersContainer}>
            <Typography variant='h4'>Order History</Typography>
            {loading && orders.length !== 0 ? (
                <div className={classes.orderItems}>
                {loading &&
                    orders.map((order) => {
                        return (
                            <SingleOrder key={order._id} order={order} />
                        )
                    })
                }
                </div>
            ):(
                <div className={classes.empty}>
                    <Typography variant='h5' style={{ fontSize: 18 }}>No Orders..!</Typography>
                </div>
            )}
        </div>
    )
}

export default Orders