import { CartState } from "../Context/Context"
import { makeStyles } from '@mui/styles';
import { useParams } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import theme from "../Theme/Theme";
import {
    Typography, Rating
} from "@mui/material";

const useStyles = makeStyles({
    productContainer: {
        position: 'relative',
        top: 100,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '6rem',
        alignItems: 'center',
        [theme.breakpoints.down("laptop")]: {
            flexDirection: 'column',
            gap: 0,
        },
    },
    details: {
        [theme.breakpoints.down("laptop")]: {
            width: 500
        },
        [theme.breakpoints.down("mobile")]: {
            width: 280
        },
    },
    price: {
        width: 200,
        alignItems: 'center',
        marginTop: 10,
        [theme.breakpoints.down("laptop")]: {
            marginTop: 20
        },
    },
    slider: {
        width: 400,
        height: 450,
        [theme.breakpoints.down("laptop")]: {
            width: 340,
            height: 400
        },
    },
    imgStyle: {
        width: 400,
        height: 400,
        [theme.breakpoints.down("laptop")]: {
            width: 340,
            height: 340
        },
    },
    buttonStyle: {
        width: 200,
        height: 36,
        marginTop: 10,
        borderRadius: 0,
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: [theme.palette.primary.main]
    },
    description: {
        width: 500,
        [theme.breakpoints.down("mobile")]: {
            width: 300,
        },
    }
})

const ProductDetails = () => {

    const { products, cart , dispatch } = CartState()
    const { id } = useParams()
    const classes = useStyles()

    const item = products.find((p) => p._id === id);

    const handleClick = () => {
        if(!(cart.some(p=>p._id === item._id))){
            dispatch({type: 'ADD_TO_CART',payload: item})
        }
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={classes.productContainer}>
            <Carousel className={classes.slider}>
                {item.img.map((i) => <img alt={item.name} src={i} className={classes.imgStyle} />)}
            </Carousel>
            <div className={classes.details}>
                <Typography
                    variant="h1"
                    style={{ fontSize: '1.4rem', width: 300, lineHeight: 1.5 }}
                >{item.name}
                </Typography>
                <Rating defaultValue={3} />
                <div className={classes.price}>
                    <Typography
                        style={{ fontWeight: 'bold', fontSize: '1.75rem' }}
                    >₹ {numberWithCommas(item.price)}
                    </Typography>
                    <span style={{ fontSize: '1rem' }}>IN STOCK</span>
                </div>
                <div style={{ marginTop: 10 }}>
                    <Typography style={{ fontWeight: 'bold' }}>Specification :</Typography>
                    <Typography
                        className={classes.description}
                    >{item.desc}
                    </Typography>
                </div>
                
                <button
                    className={classes.buttonStyle}
                    onClick={handleClick}
                >
                    ADD TO CART
                </button>
            
            </div>
        </div>
    )
}

export default ProductDetails