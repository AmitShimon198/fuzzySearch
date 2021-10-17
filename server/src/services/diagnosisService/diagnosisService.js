import { readFileData } from '../../util/fileReader.js'
import path from 'path';

export const getBloodTestConfig = () => {
    const dataSet = getBloodTestConfigFileAsObject();
    return dataSet?.bloodTestConfig?.map((item) => ({ name: item.name }))
}
export const getBloodTestConfigFileAsObject = () => {
    const joinedPath = process.env.BLOOD_TEST_CONFIG_LOCATION;
    return readFileData({ path: joinedPath });
}

export const getTestConfigByName = ({ configName }) => {
    const testConfigObject = getBloodTestConfigFileAsObject();
    return testConfigObject[configName];
}

export const analyzeTests = ({ name, result, testName }) => {
    const testConfig = getTestConfigByName({ configName: testName });
    if (testConfig?.length) {
        const filteredTests = testConfig.filter((item) => item.name?.trim()?.toLowerCase() === name?.trim()?.toLowerCase());
        if (filteredTests?.length) {
            const { threshold, range } = filteredTests[0]
            const isTestGood = result < threshold;
            return { testName: name, testResults: isTestGood ? 'GOOD' : 'BAD', range: range, testScore: result }
        }
    }
    return { testResults: 'Unknown', range: '', testName: name, testScore: result }
}