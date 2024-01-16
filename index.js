let userBlocks = document.createElement('div');
document.body.appendChild(userBlocks);
userBlocks.setAttribute('id', 'users');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(users => users.json())
    .then(users => {
        for (const user of users) {
            let userBlock = document.createElement('div');
            let userHeader = document.createElement('h2');
            userHeader.innerText = user.id + ' - ' + user.name;
            userBlock.classList.add('user');

            let userInfoButton = document.createElement('button');
            let buttonContent = document.createElement('p');
            buttonContent.innerText = 'User info';
            userInfoButton.classList.add('userInfoButton');

            userBlocks.appendChild(userBlock);
            userBlock.append(userHeader, userInfoButton);
            userInfoButton.appendChild(buttonContent);

            userInfoButton.onclick = function () {
                location.href = `user-details.html?userId=${user.id}`;
            }

        }
    });