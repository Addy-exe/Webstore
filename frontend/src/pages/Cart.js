import {
    Typography,
    Paper,
    Button
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import Cartitems from "../components/Cartitems"
import { CartState } from "../Context/Context"
import theme from "../Theme/Theme"
import { Link , useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const useStyles = makeStyles({
    cartContainer: {
        width: '80%',
        margin: 'auto',
        position: 'relative',
        top: 100,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'start',
        [theme.breakpoints.down("large")]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: 26
        }
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    backtoshop: {
        textDecoration: 'none',
        marginTop: 14
    },
    checkout: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: 120
    },
    checkoutBtn: {
        width: 300,
        position: 'relative',
        top: 10
    },
    cartDetails: {
        position: 'absolute',
        right: 2
    }
})

const Cart = () => {

    const { cart } = CartState()
    const [total, setTotal] = useState(0)
    const classes = useStyles()
    const navigate = useNavigate()

    // call for calculating total amount of cart products
    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price), 0))
    }, [cart])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={classes.cartContainer}>
            <div className={classes.itemContainer}>
                <div className={classes.itemContainer}>
                    {cart.length > 0 ? (
                        <div>
                            {cart.map((item) => (
                                <Cartitems key={item._id} item={item} />
                            ))}
                        </div>

                    ) : (
                        <Typography variant="h5">Cart is Empty</Typography>
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Paper variant="outlined" className={classes.checkout}>
                    <Typography style={{ position: 'relative', fontSize: '1.25rem' }}>Total Amount:
                        <span className={classes.cartDetails}>₹ {numberWithCommas(total)}</span>
                    </Typography>
                    <Typography style={{ position: 'relative', fontSize: '1rem', color: '#787878' }}>Total Items :
                        <span className={classes.cartDetails}>{cart.length}</span>
                    </Typography>
                </Paper>
                <Button
                    variant="contained"
                    className={classes.checkoutBtn}
                    disabled={cart.length == 0 ? true : false}
                    onClick={() => navigate('/checkout')}
                >CHECKOUT</Button>
                <Link to="/" className={classes.backtoshop}>
                    <Button variant="contained" className={classes.checkoutBtn}>Back to shop</Button>
                </Link>
            </div>
        </div>
    )
}

export default Cart
