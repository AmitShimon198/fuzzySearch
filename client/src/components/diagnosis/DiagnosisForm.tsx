import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import useSuggestions from '../../hooks/useSuggestions';
import { BloodTestResultContext } from '../../store/bloodTestResultContext';
import { FormValidationState, TestInput } from '../../types/appTypes';
import AutoComplete from '../autoComplete/AutoComplete';
import Form from '../form/Form';
import InputContainer from '../inputContainer/InputContainer';
import { nameRegex } from '../util/regexPatterns';
import classes from './diagnosisForm.module.css';
import { useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import ErrorMessage from '../error/errorMessage';
const TEST_INPUTS_INITIAL_STATE = {
    name: undefined,
    result: undefined
}

const FORM_VALIDATION_INITIAL_STATE = {
    isNameInputValid: false,
    isResultInputValid: false
}
const DiagnosisForm = () => {
    const results = useContext(BloodTestResultContext);
    const history = useHistory();
    const [testInputs, setTestInputs] = useState<TestInput>(TEST_INPUTS_INITIAL_STATE);
    const [testInputsError, setTestInputsError] = useState<TestInput>(TEST_INPUTS_INITIAL_STATE);
    const [isValid, setIsValid] = useState<FormValidationState>(FORM_VALIDATION_INITIAL_STATE);
    const { error, loading, handleHttpCall } = useFetch();
    const { suggestions, error: suggestionsError } = useSuggestions()

    const changeFormInputState = ({ inputName, inputValue }: { inputName: string; inputValue: any }) =>
        setTestInputs((prevState) => ({ ...prevState, [inputName]: inputValue }))

    const changeFormValidState = ({ name, isValid }: { name: string, isValid: boolean }) =>
        setIsValid(prevState => ({ ...prevState, [name]: isValid }))

    const onNameChange = ({ value, name }: { value: string, name: string }) => {
        let isValid = false;
        changeFormInputState({ inputName: name, inputValue: value });
        const isInputRegexValid = nameRegex.test(value)
        if (value?.trim() && isInputRegexValid) {
            isValid = true;
            setTestInputsError(prev => ({ ...prev, name: '' }))
        } else if (!isInputRegexValid && value?.trim()) {
            setTestInputsError(prev => ({ ...prev, name: 'Only A-Z a-z and 0-9 and .,:/!\\- )( allow' }))
        }
        changeFormValidState({ name: 'isNameInputValid', isValid });
    }

    const onResultChange = ({ target }: { target: any }) => {
        const { value, name } = target;
        let isValid = false;
        changeFormInputState({ inputName: name, inputValue: +value })
        if (value && +value >= 0) {
            isValid = true;
        }
        changeFormValidState({ name: 'isResultInputValid', isValid });
    }

    const onSubmit = async (event: any) => {
        const httpRes = await handleHttpCall({
            url: `${process.env.REACT_APP_API_BASE_URL}/diagnosis`
            , options: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    diagnosisName: testInputs.name,
                    result: testInputs?.result,
                    testName: 'bloodTestConfig',
                })
            }
        })
        results.setTestResults(httpRes);
        history.push('/results')
    }

    const isFormValid = isValid?.isNameInputValid && isValid?.isResultInputValid;

    return (
        <>
            {error && <ErrorMessage message={error} />}
            {suggestionsError && <ErrorMessage message={suggestionsError} />}
            <Form onFormSubmit={onSubmit} header='Analyze you`r blood test'>
                {!!suggestions?.length &&
                    <InputContainer>
                        <>
                            Name:
                            <AutoComplete name='name' onItemClick={onNameChange} onAutoComleateChange={onNameChange} suggestions={suggestions} />
                        </>
                    </InputContainer>
                }
                {testInputsError?.name && <span className={classes.errorMessage}>{testInputsError?.name}</span>}
                <InputContainer>
                    <>
                        Result:
                        <input className={classes.input} type='number' onChange={onResultChange} name='result' />
                    </>
                </InputContainer>
                <button type='submit' className={`${classes.button} ${!isFormValid && classes.disabled}`} disabled={!isFormValid}>
                    <span className={classes.buttonTitle}>Submit test results</span>
                    {loading && <Spinner size='sm' animation="border" />}
                </button>
            </Form>
        </>
    )
}
export default DiagnosisForm;