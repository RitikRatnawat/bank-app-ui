import classes from "./Transaction.module.css"
import { useNavigate } from "react-router-dom"

const Transaction = (props) => {

    const navigate = useNavigate()

    const depositHandler = () => {
        return navigate("/deposit")
    }

    const transferHandler = () => {
        return navigate("/transfer")
    }

    return (
        <div className={classes.actions}>
            <h1>Services</h1>
            <button onClick={depositHandler}>Deposit Money</button>
            <button onClick={transferHandler}>Transfer Money</button>
        </div>
    )
}

export default Transaction