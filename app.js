// Selecting elements and storing in variables
const danielSelectorBtn = document.querySelector("#daniel-selector");
const modestaSelectorBtn = document.querySelector("#modesta-selector");

const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");

//
const messages = JSON.parse(localStorage.getItem("messages")) || [];
console.log(messages);

// Creates message element to insert to chatMessages DOM
const createChatMessageElement = (message) => `      
    <div class="message ${message.sender === "Daniel" ? "blue-bg" : "gray-bg"}">
          <div class="message-sender">${message.sender}</div>
          <div class="message-text">${message.text}</div>
          <div class="message-timestamp">${message.timestamp}</div>
    </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = "Daniel";

// Updates the message sender
const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} is chatting...`;

  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === "Daniel") {
    danielSelectorBtn.classList.add("active-person");
    modestaSelectorBtn.classList.remove("active-person");
  }

  if (name === "Modesta") {
    modestaSelectorBtn.classList.add("active-person");
    danielSelectorBtn.classList.remove("active-person");
  }

  chatInput.focus();
};

// Calls updateMessageSender Function
danielSelectorBtn.onclick = () => updateMessageSender("Daniel");
modestaSelectorBtn.onclick = () => updateMessageSender("Modesta");

// Sends message into the DOM
const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  messages.push(message);

  localStorage.setItem("messages", JSON.stringify(messages));

  chatMessages.innerHTML += createChatMessageElement(message);

  chatInputForm.reset();
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener("submit", sendMessage);

// Clear messages

clearChatBtn.addEventListener("click", () => {
  localStorage.clear();
  chatMessages.innerHTML = "";
});
