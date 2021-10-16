import { FunctionComponent } from "react";
import classes from './card.module.css';
const Card: FunctionComponent = ({ children }) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
}

export default Card;