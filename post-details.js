function recursiveOrdering(obj, htmlBlock) {
    let ul = document.createElement('ul');
    htmlBlock.append(ul);

    for (const fieldName in obj) {
        let li = document.createElement('li');
        ul.append(li);

        if (typeof obj[fieldName] === 'object') {
            li.innerText = `<span>${fieldName}:</span>`;
            recursiveOrdering(obj[fieldName], li);
        } else {
            li.innerHTML = `<span>${fieldName}:</span> ${obj[fieldName]}`;
        }
    }
}

let urlInfoPostId = new URL(location.href);
let postId = urlInfoPostId.searchParams.get('postId');

let postDetailsBlock = document.createElement('div');
postDetailsBlock.setAttribute('id', 'postDetailsBlock');
let postDetailsHeader = document.createElement('h1');
postDetailsHeader.innerText = 'Post Details';
let postBlock = document.createElement('div');
postBlock.classList.add('postInfoBlock');
let commentsBlock = document.createElement('div');
commentsBlock.classList.add('comments');

document.body.appendChild(postDetailsBlock);
postDetailsBlock.append(postDetailsHeader, postBlock, commentsBlock);

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(post => post.json())
    .then(post => {
            recursiveOrdering(post, postBlock);
    });

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(comments => comments.json())
    .then(comments => {
        for (const comment of comments) {
            let commentBlock = document.createElement('div');
            commentBlock.classList.add('commentBlock');
            commentsBlock.appendChild(commentBlock);

            recursiveOrdering(comment, commentBlock);
        }
    });