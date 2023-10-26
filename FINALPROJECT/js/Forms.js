
// I am not very good at js and the course didn't teach js so I am just leaving this how it is

const Table = document.getElementById("topics");
const NewTopicBtn = document.getElementById("newTopicBtn");
const MainPage = document.getElementsByClassName('mainPage')
const AddTags = document.getElementById('AddTags')

// const cookies = 
var cookieList = decodeURIComponent(document.cookie).split(';')

var cookies = {}
cookieList.forEach(element => {
    let temp = element.split('=')
    cookies[temp[0].replace(/\s/g, "")] = temp[1]
});

if (cookies.topics) {
    var topics = JSON.parse(cookies.topics)
}
else {
    topics = []
}


function addTopic(topic, tags, replies, description, views, lastpost, count) {
    var tagsString = '';
    tags.forEach(element => {
        tagsString += `<span style="background-color: ${element.color}">${element.tag}</span>`
    });
    Table.innerHTML += `
    <tr>
        <td>
            <div class="topicData">
                <a class="topic" href="./form.html?postid=${count}"><h4>${topic}</h4></a>
                <div class="tags">
                    ${tagsString}
                </div>
                <span class="description">
                    ${description}
                </span>
            </div>
        </td>
        <td>${replies}</td>
        <td>${views}</td>
        <td>${new Date(lastpost).toLocaleString()}</td>
    </tr>
    `;
}


j = 0
topics.forEach(element => {
    addTopic(element.topic, element.tags, element.replies, element.description, element.views, element.lastpost, j)
    j += 1
});



NewTopicBtn.addEventListener('click', function () {
    MainPage[0].style = 'display: none;'
    MainPage[1].style = 'display: block;'
})


function restorePage() {
    MainPage[0].style = 'display: block;'
    MainPage[1].style = 'display: none;'
}

function addPost() {
    user = document.getElementById("usernameInput")
    title = document.getElementById("titleInput")
    content = document.getElementById("contentInput")
    tags = Array.from(document.getElementsByClassName("tagName"))
    tagColors = Array.from(document.getElementsByClassName("tagColor"))
    k = 0;
    tagList = []
    tags.forEach(element => {
        tagList.push({ tag: element.value, color: tagColors[k].value })
        k += 1
    });
    var post = {
        topic: title.value,
        tags: tagList,
        description: content.value,
        replies: 0,
        views: 1,
        lastpost: new Date(),
        posts: [
            {
                user: user.value,
                title: title.value,
                content: content.value
            }
        ]
    }
    topics.push(post)
    restorePage();
    addTopic(post.topic, post.tags, post.replies, post.description, post.views, post.lastpost, j)
    j++
    document.cookie = `topics=${JSON.stringify(topics)}; path=/`;
}
window.rows = 1
AddTags.addEventListener('click', function () {
    window.rows += 1
    document.getElementsByClassName("TagsInput")[0].getElementsByTagName('tbody')[0].innerHTML += `
    <tr>
        <td><input type="text" placeholder="Tag" required class="tagName"></td>
        <td><label for="tagColor">Tag Color:</label></td>
        <td><input type="color" id="tagColor" class="tagColor"></td>
    </tr>
    `
})