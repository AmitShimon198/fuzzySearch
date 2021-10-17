import { useMemo, useState } from "react";
import SuggestionsList from "../suggestions/SuggestionList";
import Fuse from 'fuse.js';
import classes from "./autoComplete.module.css";

export type AutoCompleteProps = {
    suggestions: { name: string }[];
    name: string;
    onItemClick: ({ value, name }: { value: string; name: string; }) => void;
    onAutoComleateChange: ({ value, name }: { value: string; name: string; }) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ suggestions, onAutoComleateChange, onItemClick, name }) => {

    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [input, setInput] = useState<string>('')
    const fuse = useMemo(() => (new Fuse(suggestions, {
        keys: [
            'name',
        ],
        includeScore: true
    })), [suggestions]);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value, name } = event.target;
        const fuzzyResults = fuse.search(value);
        const unLinked = fuzzyResults?.map(
            (suggestion) => {
                return suggestion?.item?.name;
            }
        );
        onAutoComleateChange({ name, value })
        setInput(value)
        if (value && unLinked) {
            setFilteredSuggestions(unLinked);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const onClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
        const target = event.target as HTMLLIElement;
        onItemClick({ value: target.innerText, name });
        setInput(target.innerText);
        setFilteredSuggestions([]);
    };

    const displaySuggestions = !!filteredSuggestions?.length;

    return (
        <div className={classes.container}>
            <input
                className={classes.input}
                type="text"
                onChange={onChange}
                name={name}
                value={input}
            />
            {displaySuggestions && <SuggestionsList
                onItemClick={onClick}
                suggestions={filteredSuggestions} />}
        </div>
    );
};
export default AutoComplete;