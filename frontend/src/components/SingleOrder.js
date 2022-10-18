import React from 'react'
import {
    Paper,
    Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import theme from '../Theme/Theme'

const useStyles = makeStyles({
    papar: {
        display: 'flex',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down("tablet")]: {
            flexDirection: 'column'
        }
    },
    itemHolder: {
        [theme.breakpoints.down("tablet")]: {
            width: '100%'
        }
    },
    item:{
        display: 'flex', 
        alignItems: 'center',
    },
    imgStyle: {
        width: 120,
        height: 120
    },
    header:{
        [theme.breakpoints.down("tablet")]: {
            width: 300
        }
    }
})

const SingleOrder = ({ order }) => {

    const classes = useStyles()

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const date = order.createdAt.split("T")

    return (
        <Paper className={classes.papar}>
            <div>
                <Typography style={{ fontWeight: 'bold' }}>
                    Order Id:
                </Typography>
                <span>{order._id}</span>
                <Typography style={{ fontWeight: 'bold', marginTop: 26 }}>
                    Order On:
                </Typography>
                <span>{date[0]}</span>
            </div>
            <div>
                <Typography style={{ fontWeight: 'bold' }}>
                    Order Total:
                </Typography>
                <span style={{ fontSize: 20 }}>₹ {numberWithCommas(order.total)}</span>
                <Typography style={{ fontWeight: 'bold', marginTop: 26 }}>
                    Total Items: <span style={{ fontWeight: 100 }}>{order.cart.length}</span>
                </Typography>
            </div>
            <div className={classes.itemHolder}>
                <Typography style={{ fontWeight: 'bold' }}>Items :</Typography>
                {order.cart.map((i, index) => {
                    return (
                        <div className={classes.item} key={index}>
                            <img src={i.img[0]} alt={i.name} className={classes.imgStyle} />
                            <Typography className={classes.header}>
                                {index + 1}: {i.name}
                            </Typography>
                        </div>
                    )
                })}
            </div>
        </Paper>
    )
}

export default SingleOrder