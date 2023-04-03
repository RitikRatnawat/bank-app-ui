import { forwardRef } from "react"
import classes from "./TextArea.module.css"

const TextArea = forwardRef((props, ref) => {

    const textAreaClasses = `${classes.textarea} ${props.valid ? '' : classes.invalid}`

    return (
        <div className={textAreaClasses}>
            <label htmlFor={props.label}>{props.label}</label>
            <textarea id={props.label} placeholder={`Enter ${props.label}`} wrap="hard" ref={ref}/>
        </div>
    )
})

export default TextArea