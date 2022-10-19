import { Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useFormik } from 'formik'
import { paymentSchema } from '../Schema/Schema'
import theme from '../Theme/Theme'
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles({
    container: {
        position: 'relative',
        top: 100,
        margin: 'auto',
        width: 440,
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down("mobile")]: {
            width: 300,
            alignItems: 'center',
            gap: 20
        }
    },
    formHolder: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
    },
    input_block: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        [theme.breakpoints.down("mobile")]: {
            width: 260
        }
    },
    buttonStyle: {
        height: 28,
        [theme.breakpoints.down("mobile")]: {
            width: 260
        }
    },
    input_error: {
        color: 'red'
    },
    input_field: {
        height: 28
    },
    security: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down("mobile")]: {
            flexDirection: 'column'
        }
    },
    thankyou: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '80%',
        height: 400,
        margin: 'auto',
        marginTop: 20,
    }
})

const initialValues = {
    number: "",
    name: "",
    Expiry_date: "",
    cvv: ""
}

const Payment = () => {

    const navigate = useNavigate()

    const { values, errors, isValid, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: paymentSchema,
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();
        }
    });

    const classes = useStyles()

    const handleClick = () => {
        navigate("/preview")
    }

    return (
        <div className={classes.container}>
            <Typography variant='h5'>Payment Details</Typography>
            <form onSubmit={handleSubmit}>
                <div className={classes.formHolder}>
                    <div className={classes.input_block}>
                        <label htmlFor='number'>Card Number</label>
                        <input
                            name='number'
                            type='text'
                            placeholder='1234 1234 1234 1234'
                            value={values.number}
                            className={classes.input_field}
                            onChange={handleChange}
                        />
                        {errors.number && true ? <p className={classes.input_error}>{errors.number}</p> : null}
                    </div>
                    <div className={classes.input_block}>
                        <label htmlFor='name'>Name on Card</label>
                        <input
                            name='name'
                            type='text'
                            placeholder='Enter name'
                            value={values.name}
                            className={classes.input_field}
                            onChange={handleChange}
                        />
                        {errors.name && true ? <p className={classes.input_error}>{errors.name}</p> : null}
                    </div>
                    <div className={classes.security}>
                        <div className={classes.input_block}>
                            <label htmlFor='Expiry_date'>Expiry Date</label>
                            <input
                                name='Expiry_date'
                                type='text'
                                value={values.Expiry_date}
                                placeholder="06/30"
                                className={classes.input_field}
                                onChange={handleChange}
                            />
                            {errors.Expiry_date && true ? <p className={classes.input_error}>{errors.Expiry_date}</p> : null}
                        </div>
                        <div className={classes.input_block}>
                            <label htmlFor='cvv'>Security Code</label>
                            <input
                                name='cvv'
                                type='text'
                                value={values.cvv}
                                placeholder="123"
                                className={classes.input_field}
                                onChange={handleChange}
                            />
                            {errors.cvv && true ? <p className={classes.input_error}>{errors.cvv}</p> : null}
                        </div>
                    </div>
                    <button
                        type='button'
                        className={classes.buttonStyle}
                        disabled={!isValid || !values.cvv}
                        onClick={handleClick}
                    >
                        Process
                    </button>
                </div>
            </form>

            {/* <div className={classes.thankyou}>
                    <div>
                        <Typography variant='h2'>Thank you..!</Typography>
                        <span>Please check your mail for order confirmation</span>
                    </div>
                    <div style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
                    <div>
                        <Link to="/" style={{ textDecoration: 'none'}}>
                            <Button
                                variant='contained'
                            >Continue shoping</Button>
                        </Link>
                    </div>
                </div> */}
        </div>

    )
}

export default Payment