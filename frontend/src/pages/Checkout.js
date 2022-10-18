import { makeStyles } from '@mui/styles'
import { Input, Button, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { checkoutSchema } from '../Schema/Schema'
import theme from '../Theme/Theme'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
    checkoutContainer: {
        position: 'relative',
        top: 100,
        margin: 'auto',
        width: 420,
        height: 520,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down("tablet")]: {
            width: 300
        }
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    inputBlock: {
        display: 'flex',
        flexDirection: 'column'
    },
    input_error: {
        color: 'red'
    }
})

const initialValues = {
    name: "",
    mail: "",
    contact: "",
    Address_line1: "",
    Address_line2: "",
    city: "",
    pincode: ""
}


const Checkout = () => {

    const navigate = useNavigate()

    const { values, errors, touched, handleChange, handleSubmit, handleBlur , isValid} = useFormik({
        initialValues: initialValues,
        validationSchema: checkoutSchema,
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();
        }
    });

    const handleClick = () => {
      navigate("/payment")
    }

    const classes = useStyles()

    return (
        <div className={classes.checkoutContainer}>
            <Typography variant='h5'>Billing Address</Typography>
            <form onSubmit={handleSubmit} className={classes.formContainer}>
                <div className={classes.inputBlock}>
                    <label htmlFor='name' className={classes.inputLabel}>Name</label>
                    <Input
                        name='name'
                        type='text'
                        placeholder='Enter your name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.name && touched.name ? <p className={classes.input_error}>{errors.name}</p> : null}
                </div>
                <div className={classes.inputBlock}>
                    <label htmlFor='mail' className={classes.inputLabel}>Mail</label>
                    <Input
                        name='mail'
                        type='text'
                        placeholder='Enter your mail'
                        value={values.mail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.mail && touched.mail ? <p className={classes.input_error}>{errors.mail}</p> : null}
                </div>
                <div className={classes.inputBlock}>
                    <label htmlFor='contact' className={classes.inputLabel}>Contact</label>
                    <Input
                        name='contact'
                        type='text'
                        placeholder='Contact no'
                        value={values.contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.contact && touched.contact ? <p className={classes.input_error}>{errors.contact}</p> : null}
                </div>
                <div className={classes.inputBlock}>
                    <label htmlFor='Address_line1' className={classes.inputLabel}>Address Line 1</label>
                    <Input
                        name='Address_line1'
                        type='text'
                        placeholder='Flat no:/Building'
                        value={values.Address_line1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.Address_line1 && touched.Address_line1 ? <p className={classes.input_error}>{errors.Address_line1}</p> : null}
                </div>
                <div className={classes.inputBlock}>
                    <label htmlFor='Address_line2' className={classes.inputLabel}>Address Line 2</label>
                    <Input
                        name='Address_line2'
                        type='text'
                        placeholder='Area/Street'
                        value={values.Address_line2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.Address_line2 && touched.Address_line2 ? <p className={classes.input_error}>{errors.Address_line2}</p> : null}
                </div>
                <div className={classes.inputBlock}>
                    <label htmlFor='city' className={classes.inputLabel}>City</label>
                    <Input
                        name='city'
                        type='text'
                        placeholder='City'
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.city && touched.city ? <p className={classes.input_error}>{errors.city}</p> : null}
                </div>
                <div className={classes.inputBlock}>
                    <label htmlFor='pincode' className={classes.inputLabel}>Pincode</label>
                    <Input
                        name='pincode'
                        type='text'
                        placeholder='pincode'
                        value={values.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.pincode && touched.pincode ? <p className={classes.input_error}>{errors.pincode}</p> : null}
                </div>

                <Button
                    disabled={!isValid || !values.pincode}
                    variant="contained"
                    type="button"
                    onClick={handleClick}
                >CHECKOUT</Button>

            </form>

        </div>
    )

}

export default Checkout