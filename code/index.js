/*
    Створіть сайт з коментарями. Коментарі тут : https://jsonplaceholder.typicode.com/
    Сайт має виглядати так : https://kondrashov.online/images/screens/120.png
    На сторінку виводити по 10 коментарів, у низу сторінки зробити поле пагінації (перемикання сторінок) при перемиканні
    сторінок показувати нові коментарі. 
    з коментарів виводити : 
    "id": 1,
    "name"
    "email"
    "body":
*/

function get(url, callback){
    const ajax = new XMLHttpRequest();
    ajax.open('get', url);
    ajax.send();
    ajax.addEventListener('readystatechange', () => {
        if (ajax.readyState === 4) {
            if (ajax.status >= 200 && ajax.status < 300) {
                callback(JSON.parse(ajax.response));
            } else {
                console.error(ajax.status + "/" + ajax.statusText);
            }
        }
    })
}

/*
{
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  }
  */

function getComments(comments){
    const container = document.querySelector('.comments');
    // let i=0
    //comments = Array.from(comments);
    console.log('received ' + comments.length + ' comments.');
    console.log(comments);
    for (let i=0;i<10;i++){
        console.log(comments[i]);
        const div = createTag('div','comment');
        const name = comments[i].name.charAt(0).toUpperCase() + comments[i].name.slice(1);
        div.appendChild(createTag('h3','comment__name',name));
        div.appendChild(createTag('p','comment__text',comments[i].body));
        const a = createTag('a','comment__respond','Respond');
        a.href = "#";
        div.appendChild(a);
        container.appendChild(div);
    }
    // Array.from(comments).forEach((comment,i) => {
    //     if (i>=10) return false;
    //     console.log(comment);
    //     const div = createTag('div','comment');
    //     const h2 = createTag('h2','comment__name',comment.name);
    // })
}

function createTag(tagName, className, text){
    const tag = document.createElement(tagName);
    if (className) tag.classList.add(className);
    if (text) tag.innerText = text;
    return tag;
}

const comments = createTag('div','comments');
comments.appendChild(createTag('h1','comments__title','Comments'));
document.querySelector('body').appendChild(comments);

get('https://jsonplaceholder.typicode.com/comments', getComments);    
