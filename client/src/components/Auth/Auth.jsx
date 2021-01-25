import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import { Input } from './Input'
import { Icon } from './Icon'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { AUTH } from '../../constants/actionTypes'
import { useHistory } from 'react-router-dom'
import { signIn, signUp } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [form, setForm] = useState(initialState)

    const handleShowPassword = () => setShowPassword(!showPassword)
    
    const switchMode = () => {
        setForm(initialState)
        setIsSignUp((previsSignUp) => !previsSignUp)
        setShowPassword(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignUp) {
            dispatch(signUp(form, history))
        } else {
            dispatch(signIn(form, history))
        }
    }

    const handleChange = ({ target }) => {
        setForm({ ...form, [target.name]: target.value })
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) => {
        console.log(error)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isSignUp
                        ? 'Sign Up'
                        : 'Login'
                    }
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp &&
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </Button>
                    <GoogleLogin
                        clientId='418571538477-t9fcp3230p21kcio23nb0euf0dtelimb.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp
                                    ? 'Already have an account? Sign in'
                                    : "Don't have an account? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
