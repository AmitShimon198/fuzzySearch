import { FunctionComponent, useState } from "react";
import classes from "./errorMessage.module.css";

type ErrorMessageProps = {
    message: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ message }) => {
    const [error, setError] = useState<string>(message);
    const onDismiss = () => {
        setError('');
    }
    if (error) {
        return (
            <div className={classes.container}>
                <div className={classes.error}>
                    <button onClick={onDismiss} className={classes.button}>X</button>
                    <div className={classes.children}>
                        {error}
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default ErrorMessage;