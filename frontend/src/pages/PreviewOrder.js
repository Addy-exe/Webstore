import { useState , useEffect } from 'react'
import { Typography , Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CartState } from '../Context/Context'
import { AuthState } from '../Context/AuthContext'


const useStyles = makeStyles({
    container: {
        position: 'relative',
        top: 80,
        width: '70%',
        margin: 'auto',
        display: 'flex'
    },
    cart_items: {
        width: '60%'
    },
    singleItem: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})

const PreviewOrder = () => {

    const { cart, dispatch } = CartState()
    const [total, setTotal] = useState(0)
    const [check, setCheck] = useState(false)
    const [isProcessClick, setProcessClick] = useState(true)
    const { user } = AuthState()

    const classes = useStyles()

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price), 0))
    }, [cart])

    const handleProcess = async () => {
        setCheck(true);
        setProcessClick(false);
        // add cart items to database as order history
        const response = await fetch('http://localhost:4000/payment',{
            method: 'POST',
            body: JSON.stringify({cart,total}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })

        console.log("response",response)

        dispatch({ type: 'REMOVE_ALL' })
    }

    return (
        <div className={classes.container}>
            <div className={classes.cart_items}>
                <Typography>Order Summary :</Typography>
                {cart.map((item) => {
                    return (    
                        <Paper key={item._id} className={classes.singleItem}>
                            <img src={item.img[0]} style={{ width: 140,height: 140 }}/>
                            <Typography style={{ width: 140}}>{item.name}</Typography>
                            <Typography style={{ width: 100, height: 50}}>{item.price}</Typography>
                        </Paper>
                    )
                })}
            </div>
            <div>

            </div>
        </div>
    )
}

export default PreviewOrder

