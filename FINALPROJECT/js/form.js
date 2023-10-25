var cookieList = decodeURIComponent(document.cookie).split(';')

var cookies = {}
cookieList.forEach(element => {
    let temp = element.split('=')
    cookies[temp[0].replace(/\s/g, "")] = temp[1]
});


if (cookies.topics){
    var topics = JSON.parse(cookies.topics)
}
else {
    topics = []
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
postid = urlParams.get("postid")

activeTopic = topics[postid]

var tagsString = '';
activeTopic.tags.forEach(element => {
        tagsString += `<span style="background-color: ${element.color}">${element.tag}</span>`
});

topics[postid].views ++

document.cookie = `topics=${JSON.stringify(topics)}; path=/`;


function addReply() {
    activeTopic.posts.push({user: document.getElementById("replyUsername").value,title: document.getElementById("replyTitle").value,content: document.getElementById("replyContent").value})
    UpdatePage(activeTopic);
    activeTopic.replies += 1;
    activeTopic.lastpost = new Date()
    topics[postid] = activeTopic
    document.cookie = `topics=${JSON.stringify(topics)}; path=/`;
}
function UpdatePage(activeTopic){
    document.getElementsByClassName('content')[0].innerHTML = '<div class="topicPost"></div>'
    const Topic = document.getElementsByClassName("topicPost")[0]
    Topic.innerHTML = `
    <button id="ReplyBTN">Reply</button>
    <h1>${activeTopic.topic}</h1>
    <p>${activeTopic.posts[0].user}</p>
    <span class="tags">${tagsString}</span>
    <p>${activeTopic.posts[0].content}</p>
    `
    activeTopic.posts.forEach(element => {
        document.getElementsByClassName('content')[0].innerHTML += `
        <div class="replyPost">
            <h1>${element.title}</h1>
            <p>${element.user}</p>
            <p>${element.content}</p>
        </div>`
    });
}

UpdatePage(activeTopic);
const ReplyBTN = document.getElementById("ReplyBTN")


ReplyBTN.addEventListener('click', function() {
    document.getElementsByClassName('content')[0].innerHTML += `
    <div class="replyPost" id="response">
        <h1><input type="text" placeholder="Title" autofocus id="replyTitle"></h1>
        <p><input type="text" placeholder="Username" id="replyUsername"></p>
        <p><textarea placeholder="Reply" id="replyContent"></textarea></p>
        <button type="submit" onclick="addReply()">Submit</button>
    </div>`
})
