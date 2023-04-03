import React, { useRef } from "react"
import classes from "./DepositForm.module.css"
import Input from "../UI/Input"
import useHttp from "../../hooks/use-http"

const DepositForm = (props) => {

    const amountRef = useRef()
    const {isLoading, error, sendRequest:deposit} = useHttp((data) => {
        alert("Your Available Balance : " + data['balance'])
    })

    const depositHandler = (event) => {
        event.preventDefault()

        const depositData = {
            balance: parseFloat(amountRef.current.value)
        }

        const user_id = sessionStorage.getItem("user_id")
        const token = sessionStorage.getItem("token")

        deposit({
            url: "http://127.0.0.1:8000/my-bank/account/deposit/" + user_id,
            method: "PUT",
            body: depositData,
            headers: {
                "Authorization": "Token " + token,
                "Content-Type": "application/json",
            },
        });

        amountRef.current.value = ""
    }

    const formModal = (
        <form className={classes.container} onSubmit={depositHandler}>
            <h1>Deposit Amount</h1>
            <div className={classes.form}>
                <Input label="Amount to be Deposited" valid={true} ref={amountRef}/>
                <button>Add Amount</button>
            </div>
        </form>
    )

    let detailsModal;

    if (isLoading)
        detailsModal = (
            <div className={classes.container}>
                <p>Loading...</p>
            </div>
        )

    if (error)
        detailsModal = (
            <div className={classes.container}>
                <p>{error}</p>
            </div>
        )

    return (
        <React.Fragment>
            {!isLoading && !error && formModal}
            {detailsModal}
        </React.Fragment>
    )
}

export default DepositForm