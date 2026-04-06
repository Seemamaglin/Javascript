let chatMessages = document.getElementById('chatMessages');
let messageInput = document.getElementById('message-input');
let sendBtn = document.getElementById('send-btn');

let userAtBottom = true;  

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;

  messageDiv.innerHTML = `
    <div>${text}</div>
    <div class="time">${getTime()}</div>
  `;

  chatMessages.appendChild(messageDiv);

}

sendBtn.addEventListener("click", () => {
  const text = messageInput.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  messageInput.value = "";

  simulateReply();
});

function simulateReply() {
  setTimeout(() => {
    const replies = [
      "Hello!",
      "How are you?",
      "Nice to chat with you 😊",
      "Tell me more!",
      "That's interesting!"
    ];

    const randomReply =
      replies[Math.floor(Math.random() * replies.length)];

    addMessage(randomReply, "bot");
  }, 1500);
}

