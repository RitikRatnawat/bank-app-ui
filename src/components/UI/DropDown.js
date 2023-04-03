import { forwardRef } from "react"
import classes from "./DropDown.module.css"

const DropDown = forwardRef((props, ref) => {

    const options = props.types.map((type) => {
        return <option key={type} value={type}>{type}</option>
    })

    return (
        <div className={classes.dropdown}>
            <label htmlFor={props.label}>{props.label}</label>
            <select name={props.label} id={props.label} ref={ref}>
                {options}
            </select>
        </div>
    )
})

export default DropDown