const status = document.getElementById("status");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

const ws = new WebSocket("ws://localhost:3000")

function setStatus(value) {
    status.innerHTML = value
}

function printmsg(msg) {
    const li = document.createElement("li");
    li.innerHTML = msg.data;
    messages.appendChild(li)
}

form.addEventListener("submit", event => {
    event.preventDefault()
    ws.send(input.value)
    input.value = ''
})

ws.onopen = () => setStatus("Online")

ws.onclose = () => setStatus("Offline")

ws.onmessage = response => printmsg(response)