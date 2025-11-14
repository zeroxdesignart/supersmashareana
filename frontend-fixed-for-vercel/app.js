const API_BASE = "http://127.0.0.1:8000";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return res.json();
}

function addMessage(panelId, role, text) {
  const messages = document.getElementById(panelId);
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

async function init() {
  const bots = await fetchJSON(`${API_BASE}/api/bots`);
  const tools = await fetchJSON(`${API_BASE}/api/tools`);

  const leftBotSelect = document.getElementById("left-bot-select");
  const rightBotSelect = document.getElementById("right-bot-select");
  const leftToolSelect = document.getElementById("left-tool-select");
  const rightToolSelect = document.getElementById("right-tool-select");

  for (const bot of bots) {
    const opt1 = document.createElement("option");
    opt1.value = bot.id;
    opt1.textContent = `${bot.name} (${bot.id})`;
    leftBotSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = bot.id;
    opt2.textContent = `${bot.name} (${bot.id})`;
    rightBotSelect.appendChild(opt2.cloneNode(true));
  }

  for (const tool of tools) {
    const opt1 = document.createElement("option");
    opt1.value = tool.id;
    opt1.textContent = `${tool.name}`;
    leftToolSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = tool.id;
    opt2.textContent = `${tool.name}`;
    rightToolSelect.appendChild(opt2.cloneNode(true));
  }

  // Set defaults
  if (bots.length > 0) {
    leftBotSelect.value = bots[0].id;
    rightBotSelect.value = bots[Math.min(1, bots.length - 1)].id;
  }
  if (tools.length > 0) {
    leftToolSelect.value = tools[0].id;
    rightToolSelect.value = tools[0].id;
  }

  const sendButton = document.getElementById("send-button");
  const promptInput = document.getElementById("prompt-input");

  sendButton.addEventListener("click", async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    const leftMessages = document.getElementById("left-messages");
    const rightMessages = document.getElementById("right-messages");
    leftMessages.innerHTML = "";
    rightMessages.innerHTML = "";

    addMessage("left-messages", "user", prompt);
    addMessage("right-messages", "user", prompt);

    const leftBotId = leftBotSelect.value;
    const rightBotId = rightBotSelect.value;
    const leftToolId = leftToolSelect.value;
    const rightToolId = rightToolSelect.value;

    try {
      const [leftResp, rightResp] = await Promise.all([
        postJSON(`${API_BASE}/api/chat`, {
          message: prompt,
          bot_id: leftBotId,
          tool_id: leftToolId,
          history: [],
        }),
        postJSON(`${API_BASE}/api/chat`, {
          message: prompt,
          bot_id: rightBotId,
          tool_id: rightToolId,
          history: [],
        }),
      ]);

      addMessage(
        "left-messages",
        "bot",
        `[${leftResp.bot_id} · ${leftResp.tool_id}]\n\n` + leftResp.reply
      );
      addMessage(
        "right-messages",
        "bot",
        `[${rightResp.bot_id} · ${rightResp.tool_id}]\n\n` + rightResp.reply
      );
    } catch (err) {
      addMessage("left-messages", "bot", "Error: " + err.message);
      addMessage("right-messages", "bot", "Error: " + err.message);
    }
  });
}

window.addEventListener("DOMContentLoaded", init);
