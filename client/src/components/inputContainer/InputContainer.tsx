
import classes from './inputContainer.module.css';
const InputContainer: React.FC = ({ children }) => (
    <div className={classes.container}>
        <label>
            {children}
        </label>
    </div>);

export default InputContainer;

