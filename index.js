const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/api/pdfs', (req, res) => {
    const resu = req.body['upload-data'].split(',')[1]
    const fileName = crypto.randomBytes(20).toString('hex');
    fs.writeFile(__dirname + "/public/" + fileName + '.pdf', resu, 'base64', function(err) {
        console.log(err);
    });

    res.json({
        message: 'File uploaded successfully',
        filename: fileName + '.pdf'
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));