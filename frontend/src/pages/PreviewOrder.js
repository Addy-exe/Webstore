import React from 'react'
import { Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { CartState } from '../Context/Context'
import { display } from '@mui/system'

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        top: 200,
        display: 'flex'
    },
    thankyou: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '80%',
        height: 220,
        margin: 'auto',
        marginTop: 20,
    }
})

const PreviewOrder = () => {

    const { cart, dispatch } = CartState()

    const classes = useStyles()

    console.log("cart Data", cart)

    return (
        <div className='container'>
            <div className='orders'>
                <Typography>Order Summary</Typography>
            </div>
            <div className='summary'>

            </div>
        </div>
    )
}

export default PreviewOrder


{/* <div className={classes.thankyou}>
<div>
    <Typography variant='h2'>Thank you..!</Typography>
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
</div> */}