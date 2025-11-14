# Frontend (Vanilla JS)

This is a very simple static frontend that talks to the FastAPI backend.

## Usage

1. Start the backend (`uvicorn main:app --reload`).
2. Serve this folder with any static file server, for example:

```bash
cd frontend
python -m http.server 5500
```

3. Open `http://127.0.0.1:5500/index.html` in your browser.

You will see two panels (left and right) that let you pick:

- Which bot to use
- Which tool (mode) to apply

When you type a prompt and click **"Send to Both"**, the same prompt is sent
to both sides so you can compare answers, similar to a mini Chatbot Arena.
