import fs from 'fs';

export const readFileData = ({ path }) => {
    let rawdata = fs.readFileSync(path);
    return JSON.parse(rawdata);
}

