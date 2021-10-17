import { FunctionComponent } from "react";
import ErrorMessage from "./errorMessage";
import classes from "./errorMessage.module.css";
interface ErrorListProps {
    errors: string[]
}

const ErrorList: FunctionComponent<ErrorListProps> = ({ errors }) => {

    return (<div className={classes.errorList}>
        {errors.map((error: string, idx: number) => (<ErrorMessage message={error} key={'error_' + idx} />))}
    </div>);
}

export default ErrorList;