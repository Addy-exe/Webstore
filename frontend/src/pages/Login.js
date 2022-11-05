import { Typography , Input } from "@mui/material";
import { useState } from "react";
import { makeStyles } from '@mui/styles'
import theme from "../Theme/Theme";
import { useLogin } from "../components/useLogin";
import { Link } from "react-router-dom"

const useStyles = makeStyles({
    Form_container: {
        width: 300,
        height: 400,
        margin: 'auto',
        marginTop: 100,
        border: 2,
        borderColor: 'black',
        backgroundColor: 'hsl(120, 100%, 98%)'
    },
    Signup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    input_block: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        width: '70%',
        height: 30,
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        border: 'none',
        cursor: 'pointer'
    },
    error: {
        width: '80%',
        height: 20,
        borderRadius: 12,
        backgroundColor: '#ed4337',
        color: 'white',
        textAlign: 'center'
    }
})

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const classes = useStyles()

    const handleSubmit = async (e) => {
        // prevent default refresh
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className={classes.Form_container}>
            <form className={classes.Signup} onSubmit={handleSubmit}>
                <div className={classes.header}>
                    <Typography>
                        LOGIN
                    </Typography>
                </div>
                <div className={classes.input_block}>
                    <label>Email:</label>
                    <Input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your mail"
                    />
                </div>
                <div className={classes.input_block}>
                    <label>Password:</label>
                    <Input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    disabled={isLoading}
                    variant="contained"
                    type="submit"
                    className={classes.button}
                >Login</button>
                <div className={classes.new_user}>
                    <Typography>
                        New user?
                        <Link to="/signup">
                            Sign up
                        </Link>
                    </Typography>
                </div>
                {error && <div className={classes.error}>{error}</div>}
            </form>
        </div>
    )
}

export default Signup