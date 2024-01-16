function recursiveOrdering(obj, htmlBlock) {
    let ul = document.createElement('ul');
    htmlBlock.append(ul);

    for (const fieldName in obj) {
        let li = document.createElement('li');
        ul.append(li);

        if (typeof obj[fieldName] === 'object') {
            li.innerHTML = `<span>${fieldName}:</span>`;
            recursiveOrdering(obj[fieldName], li);
        } else {
            li.innerHTML = `<span>${fieldName}:</span> ${obj[fieldName]}`;
        }
    }
}

let urlInfoUserId = new URL(location.href);
let userId = urlInfoUserId.searchParams.get('userId');

let userDetailsBlock = document.createElement('div');
userDetailsBlock.setAttribute('id', 'userDetailsBlock');
let infoUserBlock = document.createElement('div');
infoUserBlock.classList.add('infoUserBlock');

document.body.appendChild(userDetailsBlock);

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(user => user.json())
    .then(user => {
        recursiveOrdering(user, infoUserBlock);
    });

let postsOfCurrentUserButton = document.createElement('button');
postsOfCurrentUserButton.classList.add('postsOfCurrentUserButton');
postsOfCurrentUserButton.innerText = `Posts Of Current User #${userId}`;

let showResponseFromApi = false;
let dataCollected = false;
let postsOfCurrentUserBlock = document.createElement('div');
postsOfCurrentUserBlock.classList.add('posts');

userDetailsBlock.append(infoUserBlock, postsOfCurrentUserButton, postsOfCurrentUserBlock);

postsOfCurrentUserButton.onclick = function () {
    if (!dataCollected) {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(posts => posts.json())
            .then(posts => {
                for (const post of posts) {
                    let postOfCurrentUserBlock = document.createElement('div');
                    let postContent = document.createElement('p');
                    postContent.innerText = post.title;
                    postOfCurrentUserBlock.classList.add('post');

                    let postDetailsButton = document.createElement('button');
                    postDetailsButton.classList.add('postDetailsButton');
                    postDetailsButton.innerText = 'Details';

                    postDetailsButton.onclick = function () {
                        location.href = `post-details.html?postId=${post.id}`;
                    }

                    postsOfCurrentUserBlock.appendChild(postOfCurrentUserBlock);
                    postOfCurrentUserBlock.append(postContent, postDetailsButton);
                }
            });
        dataCollected = true;
    }
    if (!showResponseFromApi) {
        postsOfCurrentUserBlock.style.display = 'flex';
        showResponseFromApi = true;
    } else if (showResponseFromApi) {
        postsOfCurrentUserBlock.style.display = 'none';
        showResponseFromApi = false;
    }
};