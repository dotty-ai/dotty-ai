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

    async function sendMessage() {
        try {
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: [
                {
                    role: "user",
                    content: text
                }
            ]
        })
    });

    const data = await response.json();

    removeThinking();

    if (data.error) {
        addMessage(data.error, "ai");
        return;
    }

    addMessage(data.reply, "ai");

} catch (err) {
    removeThinking();
    addMessage("Failed to connect to the AI server.", "ai");
    console.error(err);
        }

}

sendBtn.onclick = sendMessage;

input.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});
