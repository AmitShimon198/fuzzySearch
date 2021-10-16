import { Hr } from "../hr/hr";
import classes from "./form.module.css";

export type FormProps = {
    autoComplete?: 'on' | 'off';
    header: string;
    onFormSubmit: (data: any) => void;
}

const Form: React.FC<FormProps> = ({ children, autoComplete = 'off', header, onFormSubmit }) => {
    const onSubmit: React.FormEventHandler = async (event) => {
        event.preventDefault();
        onFormSubmit(event);
    }
    return (<div className={classes.container}>
        <form autoComplete={autoComplete} className={classes.form} onSubmit={onSubmit}>
            <h3 className={classes.header}>{header}</h3>
            <Hr />
            {children}
        </form>
    </div>)
}
export default Form;