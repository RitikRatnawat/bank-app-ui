import React, { useRef, useState } from 'react'
import useHttp from "../../hooks/use-http"
import classes from "./RegistrationForm.module.css"
import Input from "../UI/Input"
import DropDown from '../UI/DropDown'
import TextArea from '../UI/TextArea'

// Validation Functions
const isEmpty = (value) => value.trim() === "";
const isString = (value) => /^[A-Za-z\s]*$/.test(value)
const isAddress = (value) => /^[[A-Za-z0-9'/.\s,]*$/.test(value)
const isAadhar = (value) => Number.isInteger(+value) && value.trim().length === 12
const isContact = (value) => Number.isInteger(+value) && value.trim().length === 10

const RegistrationForm = (props) => {

    // State for Account's Data
    const [accountData, setAccountData] = useState({
        "Account Number": "",
        Username: "",
        Password: ""
    })

    // State for Registration 
    const [isRegistered, setIsRegistered] = useState(false)

    // State for Form Inputs Validity
    const [formInputValidity, setFormInputValidity] = useState({
        nameIsValid: true,
        fatherNameIsValid: true,
        aadharIsValid: true,
        contactIsValid: true,
        addressIsValild: true
    })

    // Function to Send Request to Backend Server
    const getDetails = (data) => {
        setIsRegistered(true)
        setAccountData(data)
    }

    const { isLoading, error, sendRequest: register } = useHttp(getDetails)

    // References for All Form Elements
    const nameRef = useRef()
    const fatherNameRef = useRef()
    const aadharRef = useRef()
    const contactRef = useRef()
    const accountTypeRef = useRef()
    const debitCardRef = useRef()
    const addressRef = useRef()

    // Options for Dropdowns
    const account_types = ["Savings", "Current"]
    const choices = ["Yes", "No"]

    // Submit Handler Function to Submit the Form to Backend Server
    const submitHandler = (event) => {
        event.preventDefault()

        const enteredName = nameRef.current.value
        const enteredFatherName = fatherNameRef.current.value
        const enteredAadhar = aadharRef.current.value
        const enteredContact = contactRef.current.value
        const enteredAccountType = accountTypeRef.current.value
        const enteredDebitCard = debitCardRef.current.value === "Yes" ? true : false
        const enteredAddress = addressRef.current.value

        const nameIsValid = !isEmpty(enteredName) && isString(enteredName)
        const fatherNameIsValid = !isEmpty(enteredFatherName) && isString(enteredFatherName)
        const aadharIsValid = !isEmpty(enteredAadhar) && isAadhar(enteredAadhar)
        const contactIsValid = !isEmpty(enteredContact) && isContact(enteredContact)
        const addressIsValid = !isEmpty(enteredAddress) && isAddress(enteredAddress)

        setFormInputValidity({
            nameIsValid: nameIsValid,
            fatherNameIsValid: fatherNameIsValid,
            aadharIsValid: aadharIsValid,
            contactIsValid: contactIsValid,
            addressIsValild: addressIsValid
        })

        const formIsValid = nameIsValid && fatherNameIsValid && aadharIsValid && contactIsValid && addressIsValid;

        if (!formIsValid)
            return;

        const registrationData = {
            account_holder_name: enteredName,
            account_type: enteredAccountType,
            fathers_name: enteredFatherName,
            address: enteredAddress,
            identity_proof: enteredAadhar,
            contact: enteredContact,
            has_debit_card: enteredDebitCard
        }

        register({
            url: "http://3.109.158.42/my-bank/account/new/",
            method: "POST",
            body: registrationData,
            headers: {
                "Content-Type": "application/json",
            },
        });

        nameRef.current.value = ""
        fatherNameRef.current.value = ""
        aadharRef.current.value = ""
        contactRef.current.value = ""
        addressRef.current.value = ""
    }

    // Modal for Showing Form
    const formModal = (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <Input label="Name" ref={nameRef} valid={formInputValidity.nameIsValid} />
                <Input label="Father's Name" ref={fatherNameRef} valid={formInputValidity.fatherNameIsValid} />
            </div>
            <div className={classes.controls}>
                <Input label="Aadhar Number" ref={aadharRef} valid={formInputValidity.aadharIsValid} />
                <Input label="Contact" ref={contactRef} valid={formInputValidity.contactIsValid} />
            </div>
            <div className={classes.controls}>
                <DropDown label="Account Type" types={account_types} ref={accountTypeRef} />
                <DropDown label="Applying for Debit Card" types={choices} ref={debitCardRef} />
            </div>
            <div className={classes.controls}>
                <TextArea label="Address" ref={addressRef} valid={formInputValidity.addressIsValild} />
            </div>
            <div className={classes.actions}>
                <button className={classes.submit}>Create</button>
            </div>
        </form>
    )

    let detailsModal;

    if (isRegistered)
        detailsModal = (
            <div className={classes.form}>
                <h3>Account Number : {accountData["Account Number"]}</h3>
                <div className={classes.data}>
                    <p>Username : {accountData["Username"]}</p><br />
                    <p>Password : {accountData["Password"]}</p>
                </div>
            </div>
        )

    if (isLoading)
        detailsModal = (
            <div className={classes.form}>
                <p>Loading...</p>
            </div>
        )

    if (error)
        detailsModal = (
            <div className={classes.form}>
                <p>{error}</p>
            </div>
        )

    return (
        <React.Fragment>
            <h1 className={classes.heading}>
                {`${!isRegistered ? "Create New Bank Account" : "Account Registered"}`}
            </h1>
            {!isRegistered && !error && !isLoading && formModal}
            {detailsModal}
        </React.Fragment>
    )
}

export default RegistrationForm