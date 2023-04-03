import classes from "./Input.module.css"
import { forwardRef } from "react"

const Input = forwardRef((props, ref) => {

    const inputClasses = `${classes.input} ${props.valid ? '' : classes.invalid}`
    return (
        <div className={inputClasses}>
            <label htmlFor={props.label}>{props.label}</label>
            <input type={`${props.type ? props.type : "text"}`}
                id={props.label}
                placeholder={`Enter ${props.label}`} 
                ref={ref}/>
        </div>
    )
})

export default Input