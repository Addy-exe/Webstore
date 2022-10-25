import { useState, useEffect } from 'react'
import { Typography, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CartState } from '../Context/Context'
import { AuthState } from '../Context/AuthContext'


const useStyles = makeStyles({
    container: {
        position: 'relative',
        top: 80,
        width: '70%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    cart_items: {
        width: '60%'
    },
    singleItem: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    summary: {
        position: 'relative',
        width: '32%',
        height: 120,
        marginTop: 32,  
    },
    place_order: {
        position: 'absolute',
        backgroundColor: '#2ecc71',
        border: 'none',
        borderRadius: 14,
        width: '80%',
        left: '10%',
        bottom: '10%',
        height: 26,
        cursor: 'pointer',
        color: 'white',
        letterSpacing: 1,
        fontSize: 14
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
        const response = await fetch('http://localhost:4000/payment', {
            method: 'POST',
            body: JSON.stringify({ cart, total }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })

        console.log("response", response)

        dispatch({ type: 'REMOVE_ALL' })
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={classes.container}>
            <div className={classes.cart_items}>
                <Typography>Order Summary :</Typography>
                {cart.map((item) => {
                    return (
                        <Paper key={item._id} className={classes.singleItem}>
                            <img src={item.img[0]} style={{ width: 140, height: 140 }} />
                            <Typography style={{ width: 140 }}>{item.name}</Typography>
                            <Typography style={{ width: 100, height: 50 }}>₹{numberWithCommas(item.price)}</Typography>
                        </Paper>
                    )
                })}
            </div>
            <Paper className={classes.summary}>
                <Typography style={{ position: 'relative', fontSize: '1.25rem' }}>Total Amount: <span>₹{numberWithCommas(total)}</span></Typography>
                <Typography style={{ position: 'relative', fontSize: '1rem', color: '#787878' }}>Total Items :
                    <span>{cart.length}</span>
                </Typography>
                <button 
                    className={classes.place_order}
                    onClick={handleProcess}
                >Place Order</button>
            </Paper>
        </div>
    )
}

export default PreviewOrder

