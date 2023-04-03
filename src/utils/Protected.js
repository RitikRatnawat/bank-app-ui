import { Navigate } from "react-router-dom";

const Protected = (props) => {
    
    if(sessionStorage.getItem('token'))
        return props.children
    

    alert("Please Login First")
    return <Navigate to='/' replace />;
}

export default Protected