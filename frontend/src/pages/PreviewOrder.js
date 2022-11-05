import { useState, useEffect } from 'react'
import { Typography, Paper, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CartState } from '../Context/Context'
import { AuthState } from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import theme from '../Theme/Theme'


const useStyles = makeStyles({
    container: {
        position: 'relative',
        top: 80,
        width: '70%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down("tablet")]: {
           flexDirection: 'column',
        }
    },
    singleItem: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down("tablet")]: {
            flexDirection: 'column',
            gap: 30
         }
    },
    summary: {
        position: 'relative',
        height: 120,
        marginTop: 32,
        [theme.breakpoints.down("mobile")]: {
            height: 160
        }
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
    },
    thankyou: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '40%',
        height: 260,
        margin: 'auto',
        marginTop: 100,
    },
})

const PreviewOrder = () => {

    const { cart, dispatch } = CartState()
    const [total, setTotal] = useState(0)
    const [check, setCheck] = useState(true)
    const { user } = AuthState()

    const classes = useStyles()

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price), 0))
    }, [cart])

    const handleProcess = async () => {
        setCheck(false);
        // add cart items to database as order history
        const response = await fetch('https://webstore-mern.herokuapp.com/payment', {
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
        <>
            {check ? (
                <div className={classes.container}>
                    <div>
                        <Typography>Order Summary :</Typography>
                        {cart.map((item) => {
                            return (
                                <Paper key={item._id} className={classes.singleItem}>
                                    <img src={item.img[0]} style={{ width: 140, height: 140 }} alt={item._id}/>
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
            ) : (
                <div className={classes.thankyou}>
                    <div className={classes.head}>
                    <Typography variant='h3'>Thank you..!</Typography>
                    <span>Please check your mail for order confirmation</span>
                    </div>
                    <div style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
                    <div>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button
                                variant='contained'
                            >Continue shoping</Button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default PreviewOrder

