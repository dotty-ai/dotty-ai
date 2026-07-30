const messages = document.getElementById("messages");
const input = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {

    const bubble = document.createElement("div");
    bubble.className = `message ${sender}`;

    bubble.textContent = text;

    messages.appendChild(bubble);

    messages.scrollTop = messages.scrollHeight;

}

function thinking() {

    const bubble = document.createElement("div");

    bubble.className = "message ai thinking";

    bubble.id = "thinking";

    bubble.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    messages.appendChild(bubble);

    messages.scrollTop = messages.scrollHeight;

}

function removeThinking() {

    const t = document.getElementById("thinking");

    if(t){

        t.remove();

    }

}

function sendMessage(){

    const text = input.value.trim();

    if(text==="") return;

    const welcome = document.querySelector(".welcome");

    if(welcome){

        welcome.remove();

    }

    addMessage(text,"user");

    input.value="";

    thinking();

    setTimeout(()=>{

        removeThinking();

        addMessage("The AI backend isn't connected yet. We'll connect it in Part 4.","ai");

    },1500);

}

sendBtn.onclick = sendMessage;

input.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});