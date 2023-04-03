import React, { useRef } from "react"
import classes from "./TransferForm.module.css"
import Input from "../UI/Input"
import useHttp from "../../hooks/use-http"

const TransferForm = (props) => {

    const toAccountRef = useRef()
    const amountRef = useRef()

    const {isLoading, error, sendRequest:transfer} = useHttp((data) => {
        alert("Your Available Balance : " + data['from_balance'])
    })

    const tranferHandler = (event) => {
        event.preventDefault()

        const transferData = {
            to_acc: parseInt(toAccountRef.current.value),
            balance: parseFloat(amountRef.current.value)
        }

        const user_id = sessionStorage.getItem("user_id")
        const token = sessionStorage.getItem("token")

        transfer({
            url: "http://127.0.0.1:8000/my-bank/account/transfer/" + user_id,
            method: "PUT",
            body: transferData,
            headers: {
                "Authorization": "Token " + token,
                "Content-Type": "application/json",
            },
        });

        toAccountRef.current.value = ""
        amountRef.current.value = ""
    }

    const formModal = (
        <form className={classes.container} onSubmit={tranferHandler}>
            <h1>Transfer Amount</h1>
            <div className={classes.form}>
                <Input label="Beneficiary Account" valid={true} ref={toAccountRef}/>
                <Input label="Amount" valid={true} ref={amountRef}/>
                <button>Trasfer Amount</button>
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

export default TransferForm