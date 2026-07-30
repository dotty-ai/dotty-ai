const chat = document.getElementById("chat");
const form = document.getElementById("chatForm");
const input = document.getElementById("prompt");
const typing = document.getElementById("typing");

let history = [];

function addMessage(sender, text) {

    const message = document.createElement("div");
    message.className = `message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = sender === "user" ? "🧑" : "🤖";

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    bubble.innerHTML = `
        <p>${text.replace(/\n/g, "<br>")}</p>
    `;

    message.appendChild(avatar);
    message.appendChild(bubble);

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const prompt = input.value.trim();

    if (!prompt) return;

    addMessage("user", prompt);

    history.push({
        role: "user",
        content: prompt
    });

    input.value = "";

    typing.classList.remove("hidden");

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                messages: history
            })

        });

        const data = await response.json();

        typing.classList.add("hidden");

        if (data.reply) {

            addMessage("ai", data.reply);

            history.push({
                role: "assistant",
                content: data.reply
            });

        } else {

            addMessage("ai", "⚠️ No response received.");

        }

    } catch (err) {

        typing.classList.add("hidden");

        addMessage(
            "ai",
            "❌ Unable to connect to the AI server."
        );

        console.error(err);

    }

});