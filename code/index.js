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

const commentsObj = {
    page: 1,
    comments: []
};

function get(url, callback){
    const ajax = new XMLHttpRequest();
    ajax.open('get', url);
    ajax.send();
    ajax.addEventListener('readystatechange', () => {
        if (ajax.readyState === 4) {
            if (ajax.status >= 200 && ajax.status < 300) {
                callback(JSON.parse(ajax.response));
                document.querySelector('.loader').classList.add('hide');
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

function getComments(comments = commentsObj.comments){
    commentsObj.comments = comments;
    const container = document.querySelector('.comments');
    cleanComments();
    const paggination = document.querySelector('.comments__paggination');
    const shift = 10*(commentsObj.page - 1);
    for (let i = 0 + shift; i < 10 + shift; i++){
        const div = createTag('div','comment');
        div.appendChild(getName(comments[i]));
        div.appendChild(getBody(comments[i]));
        div.appendChild(getRespondLink(comments[i]));
        container.insertBefore(div, paggination);
    }
}

function getName(comment){
    const name = comment.id + ' ' + comment.name.charAt(0).toUpperCase() + comment.name.slice(1);
    return createTag('h3','comment__name',name);
}

function getBody(comment){
    return createTag('p','comment__text',comment.body);
}

function getRespondLink(comment){        
    const a = createTag('a','comment__respond','Respond');
    a.href = 'mailto:' + comment.email;
    return a;
}

function cleanComments(){
    const container = document.querySelector('.comments');
    Array.from(document.getElementsByClassName('comment')).forEach((comment) => {
        container.removeChild(comment);
    });
}

function createTag(tagName, className, text){
    const tag = document.createElement(tagName);
    if (className) tag.classList.add(className);
    if (text) tag.innerHTML = text;
    return tag;
}

function paggination(){
    const paggination = createTag('div','comments__paggination')
    const prev = createTag('span','comments__btn','&#8678');
    const next = createTag('span','comments__btn','&#8680;');
    prev.id = "prevBtn";
    next.id = "nextBtn";
    prev.classList.add('disabled');
    prev.addEventListener('click', prevPage);
    next.addEventListener('click', nextPage);
    const page = createTag('span','comments__page','1');
    paggination.appendChild(prev);
    paggination.appendChild(page);
    paggination.appendChild(next);
    return paggination;
}

function nextPage(e){
    if (e.target.classList.contains('disabled')) return;
    commentsObj.page ++;
    document.querySelector('.comments__page').innerHTML = commentsObj.page;
    if (commentsObj.page >= commentsObj.comments.length/10.){
        e.target.classList.add('disabled');
    }
    document.querySelector('#prevBtn').classList.remove('disabled');
    getComments();
}

function prevPage(e){
    if (e.target.classList.contains('disabled')) return;
    commentsObj.page --;
    document.querySelector('.comments__page').innerHTML = commentsObj.page;
    if (commentsObj.page === 1){
        e.target.classList.add('disabled');
    }
    document.querySelector('#nextBtn').classList.remove('disabled');
    getComments();
}

const comments = createTag('div','comments');
comments.appendChild(createTag('h1','comments__title','Comments'));
comments.appendChild(paggination());
document.querySelector('body').appendChild(comments);

get('https://jsonplaceholder.typicode.com/comments', getComments);    
