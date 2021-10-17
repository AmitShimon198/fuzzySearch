import React, { useState, createContext } from 'react';

export type BloodTestResult = {
    testResults: 'GOOD' | 'BAD' | 'Unknown',
    range: number[],
    testName: string,
    testScore: number,
    setTestResults: (data: any) => void
}

export const initialState: BloodTestResult = {
    testResults: 'Unknown',
    testName: '',
    range: [],
    testScore: 0,
    setTestResults: (data) => { }
}

export const BloodTestResultContext = createContext<BloodTestResult>(initialState)

const BloodTestContextProvider: React.FC = ({ children }) => {
    const [bloodResult, setBloodResults] = useState<BloodTestResult>()
    const value = bloodResult || initialState
    return (
        <BloodTestResultContext.Provider value={{ ...value, setTestResults: setBloodResults }} >
            {children}
        </BloodTestResultContext.Provider >
    )
}

export default BloodTestContextProvider;