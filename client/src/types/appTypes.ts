export type FormValidationState = {
    isNameInputValid: boolean;
    isResultInputValid: boolean;
}

export type TestInput = {
    name?: string;
    result?: number;
}

export type UseFetchProps = { url: string; options?: RequestInit | undefined; }