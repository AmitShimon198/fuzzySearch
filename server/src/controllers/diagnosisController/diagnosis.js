import { Router } from 'express';
import { analyzeTests, getBloodTestConfig } from '../../services/diagnosisService/diagnosisService.js';
const router = Router();

router.post('/api/diagnosis', async (req, res) => {
    const { diagnosisName, result, testName } = req.body;
    const testResult = analyzeTests({ name: diagnosisName, result, testName });
    res.send(testResult);
})
router.get('/api/diagnosisOptions', async (req, res) => {
    const options = getBloodTestConfig()
    res.send(options);
})

export default router