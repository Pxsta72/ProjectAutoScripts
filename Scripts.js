const express = require('express')

const app = express()
const accessToken = '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';

async function ReadFile(file) {
    const fileData = await (await fetch(`https://api.github.com/repos/Pxsta72/ProjectAutoScripts/contents/Scripts/${file}`, {
        headers: {
            Authorization: `token ${accessToken}`, 
            accept: 'application/vnd.github+json'
        }
    })).json()
    if (fileData.status == '404') { return 'invalid script name'}
    return Buffer.from(fileData['content'], 'base64').toString('utf-8');
}

app.get('*', async (req, res) => {
    const page = req.path.substring(1)
    res.send(await ReadFile(page));
});

app.listen(3000)
