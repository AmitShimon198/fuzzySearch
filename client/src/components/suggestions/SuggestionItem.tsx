import classes from './suggestion.module.css';

export type SuggestionsItemProps = {
    onItemClick: React.MouseEventHandler;
    suggestion: string;
}

const SuggestionItem: React.FC<SuggestionsItemProps> = ({ suggestion, onItemClick }) => {
    return (
        <li className={classes.item} onClick={onItemClick}>
            {suggestion}
        </li>
    );
}

export default SuggestionItem;