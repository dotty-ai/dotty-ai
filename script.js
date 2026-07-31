const chat = document.getElementById("chat");
const form = document.getElementById("chatForm");
const input = document.getElementById("prompt");
const themeBtn = document.getElementById("themeBtn");

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = sender === "user" ? "🧑" : "🤖";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    message.appendChild(avatar);
    message.appendChild(bubble);

    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
    document.getElementById("typing").classList.remove("hidden");
}

function hideTyping() {
    document.getElementById("typing").classList.add("hidden");
}

async function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    showTyping();

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

        hideTyping();

        if (!response.ok) {
            addMessage(data.error || "Something went wrong.", "ai");
            return;
        }

        addMessage(data.reply, "ai");

    } catch (err) {
        hideTyping();
        console.error(err);
        addMessage("Unable to connect to the AI server.", "ai");
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    sendMessage();
});

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});
