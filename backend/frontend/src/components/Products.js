import { React } from 'react'
import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CartState } from '../Context/Context';
import theme from '../Theme/Theme';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    actionArea:{
       height: 380
    },
    cardImg: {
        height: 240,
    },
    cardDetails: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        width: 200,
        textAlign: 'center'
    },
    addtoCart: {
       marginTop: 8,
       marginBottom: 8,
       width: 220,
       height: 26,
       borderRadius: 0,
       border: 'none',
       cursor: 'pointer',
       color: 'white',
       backgroundColor: [theme.palette.primary.main]
    },
    linkStyle: {
        textDecoration: 'none',
        color: 'black'
    }
})

const Products = ({ product }) => {

    // Getting cart state from Context
    const { cart, dispatch } = CartState()

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleClick = () => {
        if(!(cart.some(p=>p._id === product._id))){
            dispatch({type: 'ADD_TO_CART',payload: product})
        }
    }

    // console.log("cart: ", cart)

    const classes = useStyles()

    return (
        <Card 
         sx={{width: 260 , display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 0}}
        >
            <Link 
            to={product._id}
            className={classes.linkStyle}
            >
                <CardActionArea className={classes.actionArea}>
                    <CardMedia
                        component="img"
                        image={product.img[0]}
                        className={classes.cardImg}
                    />
                    <CardContent className={classes.cardDetails}>
                        <span style={{fontWeight: 'bold' , fontSize: 16}}>₹ {numberWithCommas(product.price)}</span>
                        <div style={{height: 10}}></div>
                        <Typography className={classes.title}>
                            {product.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <button
                className={classes.addtoCart}
                onClick={handleClick}
            >
                ADD TO CART
            </button>
        </Card>
    );
}

export default Products