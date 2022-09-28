import { makeStyles } from "@mui/styles"
import { Paper, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { CartState } from "../Context/Context";
import theme from "../Theme/Theme";

const useStyles = makeStyles({
    singleItem: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 800,
        [theme.breakpoints.down("laptop")]:{
           width: 600,
        },
        [theme.breakpoints.down("tablet")]:{
            flexDirection: 'column',
            gap: 20,
            width: 400,
            height: 400,
        }
    },
    image: {
        width: 220,
        height: 200
    }
})


const Cartitems = ({ item }) => {

    const  { dispatch } = CartState()

    const classes = useStyles()

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const removeFromCart = () => {
        console.log("delete button click")
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: item
        })
    }

    return(
       <Paper variant="outlined" className={classes.singleItem}>
          <img src={item.img[0]} alt={item.name} className={classes.image}/>
          <Typography 
            sx={{
                width: 200,
                textAlign: 'center'
            }}
          >{item.name}</Typography> 
          <Typography 
          sx={{
            fontWeight: "bold"
          }}>₹ {numberWithCommas(item.price)}</Typography>
          <DeleteIcon onClick={removeFromCart}></DeleteIcon>
       </Paper>
    )
}

export default Cartitems