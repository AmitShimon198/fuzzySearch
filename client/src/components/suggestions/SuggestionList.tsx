import classes from './suggestion.module.css';
import SuggestionItem from './SuggestionItem';

export type SuggestionsListProps = {
    onItemClick: React.MouseEventHandler;
    suggestions: string[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ onItemClick, suggestions }) => {

    const showSuggestions = !!suggestions?.length;
    if (showSuggestions) {
        return (
            <ul className={classes.container}>
                {suggestions.map((suggestion, index) => <SuggestionItem suggestion={suggestion} onItemClick={onItemClick} key={suggestion + '_' + index} />)}
            </ul>
        )
    }
    return (null);
};
export default SuggestionsList;