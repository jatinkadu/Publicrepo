// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'YOUR_REGION' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());

app.post('/addpost', async (req, res) => {
    const { title, author, content } = req.body;

    const post = {
        PostID: Date.now().toString(),
        Title: title,
        Author: author,
        Content: content,
        Timestamp: Date.now()
    };

    const params = {
        TableName: 'BlogPosts',
        Item: post
    };

    try {
        await dynamoDB.put(params).promise();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/getposts', async (req, res) => {
    const params = {
        TableName: 'BlogPosts'
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        res.json(data.Items);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/deletepost/:postID', async (req, res) => {
    const { postID } = req.params;

    const params = {
        TableName: 'BlogPosts',
        Key: {
            PostID: postID
        }
    };

    try {
        await dynamoDB.delete(params).promise();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
