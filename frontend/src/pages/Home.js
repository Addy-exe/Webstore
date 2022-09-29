import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect } from 'react'
import Products from '../components/Products'
import { CartState } from '../Context/Context'
import theme from '../Theme/Theme'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const useStyles = makeStyles({
    productsContainer: {
        position: 'relative',
        top: 70,
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        justifyContent: 'center',
        columnGap: 80,
        rowGap: 60,
        [theme.breakpoints.down("laptop")]: {
            gridTemplateColumns: 'auto auto'
        },
        [theme.breakpoints.down("tablet")]: {
            gridTemplateColumns: 'auto'
        }
    },
    error_404: {
        position: 'relative',
        top: 100,
        width: 400,
        margin: 'auto',
        textAlign: 'center',
        [theme.breakpoints.down("mobile")]:{
            width:250 
        }
    },
})

const Home = () => {

    const { products, dispatch } = CartState()

    console.log("Products :", products)

    const classes = useStyles()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://webstore-mern.herokuapp.com')
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json })
            }
        }
        fetchProducts()
    }, [dispatch])


    return (
        <>
            {!products ? (
                <div className={classes.error_404}>
                <Typography
                    variant='h5'
                >Make sure you have Internet connection ? If yes Refresh the page
                </Typography>
                <SentimentVeryDissatisfiedIcon style={{ widht: 40, height: 40}}/>
                </div>
            ) :(
                <div className={classes.productsContainer}>
                    {products && products.map((product) => {
                        return <Products key={product._id} product={product} />
                    })}
                </div>
            )}
        </>
    )
}

export default Home