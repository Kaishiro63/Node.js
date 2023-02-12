const postsList = document.getElementById("post-list");

let ws;

function connect() {
  ws = new WebSocket("ws://localhost:3000/ws-posts");

  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === "reply") addMessage(data.msg);
  };
}

async function addMessage(content) {
  const message = document.createElement("a");
  message.innerText = content;
  postsList.prepend(message);
}

connect();

function addMessage(content) {
  const message = document.createElement("a");
  message.innerText = content;
  postsList.prepend(message);
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("#post-input");
  addMessage(input.value);
  ws.send(input.value);
  input.value = "";
});
