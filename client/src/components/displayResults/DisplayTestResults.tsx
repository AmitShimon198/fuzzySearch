import { useContext } from "react";
import { BloodTestResultContext } from "../../store/bloodTestResultContext";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useHistory } from "react-router-dom";
import classes from "./displayResults.module.css";
import Card from "../card/Card";
const DisplayTestResults: React.FC = () => {
    const results = useContext(BloodTestResultContext);
    const history = useHistory();
    const back = () => history.goBack();
    const { range, testResults, testName, testScore } = results;
    const sortedRange = range?.length ? range?.sort((a, b) => a - b) : [];
    const [minRange, maxRange] = sortedRange;

    const dangerRange = sortedRange?.length ? maxRange + (maxRange / 10) : 0
    const getBarWeight = (range: number) => (range / maxRange) * 100
    return (
        <div className={classes.container}>
            <div className={classes.buttonContainer}>
                <button className={classes.button} onClick={back}>&laquo; Back</button>
            </div>
            <Card>
                <h3>Test results for - {testName}</h3>
                <div className={classes.content}>
                    <div className={testResults === 'GOOD' ? classes.good : classes.bad}>{testResults} - ({testScore})</div>
                    {sortedRange &&
                        <div className={classes.bar}>
                            <ProgressBar animated={true} >
                                <ProgressBar animated={true} striped variant="success" now={getBarWeight(minRange)} label={minRange} key={'GOOD' + 1} />
                                <ProgressBar animated={true} striped variant="warning" now={getBarWeight(maxRange)} label={maxRange} key={'OK' + 2} />
                                <ProgressBar animated={true} variant="danger" now={dangerRange} label={dangerRange} key={'BAD' + 3} />
                            </ProgressBar>
                        </div>
                    }
                </div>
            </Card>
        </div>
    )

}
export default DisplayTestResults;