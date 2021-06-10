import express from 'express';
import cors from 'cors';

const server = express();
const PORT = 4000;

server.use(cors());
server.use(express.json());

// const posts = [{
//     id: 1,
//     title: 'Hello World',
//     coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
//     contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
//     content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
//     commentCount: 2
//   }];

const posts = [];
const comments = [];  
let count = 0;

server.get('/posts', (req, res) => {
    res.send(posts);
});

server.post('/posts', (req, res) => {
    const postData = req.body;
    const post = {
        id: posts.length,
        title: postData.title,
        coverURL: postData.coverURL,
        contentPreview: postData.content.replace('<p>', '').replace('</p>', ''),
        content: postData.content,
        commentCount: count
    }
    posts.push(post);
    res.send(post);
});

server.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const response = posts.find(post => post.id === id);
    res.send(response);
});

server.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const response = posts.filter(post => post.id !== id);
    posts = response;
})

server.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const comment = {
            id: comments.length,
            postId: postId,
            author: req.body.author,
            content: req.body.content
        }
    comments.push(comment);
    res.send(comment);
});

server.get('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const response = comments.filter(comment => comment.postId === postId);
    count = response.length;
    res.send(response);
});

server.listen(PORT, () => {console.log(`server succesfully listen at port ${PORT}`)});