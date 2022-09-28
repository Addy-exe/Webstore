import * as Yup from 'yup'

// schema for checkout form validation
export const checkoutSchema = Yup.object({
    name: Yup.string().min(3).required("Please enter your name"),
    mail: Yup.string().email().required("Please enter your mail"),
    contact: Yup.number().required("Please enter your contact number"),
    Address_line1: Yup.string().min(4).required("Please enter your address"),
    Address_line2: Yup.string().min(4).required("Please enter your address"),
    city: Yup.string().min(2).required("Please enter your city"),
    pincode: Yup.number().required("Please enter your pincode")
})

export const paymentSchema = Yup.object({
    number: Yup.string().min(4).required("Please enter your credit card number"),
    name: Yup.string().min(4).required("Please enter name"),
    Expiry_date: Yup.string().min(5).required("Please enter expiry date"),
    cvv: Yup.string().min(3).required("Please enter security code")
})