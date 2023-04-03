import React, { useRef, useState } from "react"
import classes from "./LoginForm.module.css"
import Input from "../UI/Input"
import useHttp from "../../hooks/use-http"
import { useNavigate } from "react-router-dom"

const LoginForm = (props) => {

    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)

    const usernameRef = useRef()
    const passwordRef = useRef()

    const saveData = (data) => {
        console.log(data)
        sessionStorage.setItem("token", data['token'])
        setLoggedIn(true)
    }

    const { isLoading, error, sendRequest: login } = useHttp(saveData)

    const submitHandler = (event) => {
        event.preventDefault()

        const loginData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        console.log(loginData)
        sessionStorage.setItem("user_id", usernameRef.current.value)

        login({
            url: "http://3.109.158.42/my-bank/account/login/",
            method: "POST",
            body: loginData,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    if (loggedIn) {
        alert("Login Successful")
        return navigate("/transaction")
    }

    const formModal = (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <Input label="Username" ref={usernameRef} valid={true} />
                <Input label="Password" type="password" ref={passwordRef} valid={true} />
            </div>
            <div className={classes.actions}>
                <button className={classes.submit}>Login</button>
            </div>
        </form>
    )

    let detailsModal

    if (isLoading)
        detailsModal = (
            <div className={classes.form}>
                <p>Loading...</p>
            </div>
        )

    if (error){
        sessionStorage.removeItem('user_id')
        detailsModal = (
            <div className={classes.form}>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <React.Fragment>
            <h1 className={classes.heading}>Login to Your Account</h1>
            {!loggedIn && !error && !isLoading && formModal}
            {detailsModal}
        </React.Fragment>
    )
}

export default LoginForm