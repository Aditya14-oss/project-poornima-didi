# PROJECT: POORNIMA.exe

A responsive, cinematic hacker-style birthday experience built with vanilla HTML, CSS, and JavaScript.

## Run locally
1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge, or Firefox.
3. For the best developer workflow, open the folder in VS Code and use the Live Server extension.

## Publish it free with GitHub Pages
1. Create a new public repository on GitHub, for example `project-poornima`.
2. Upload `index.html`, `style.css`, and `script.js` (you can also upload this README).
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. Wait for the deployment to finish. GitHub will show a public website URL. Send that URL to Poornima on WhatsApp.

## Personalize it before sending
- Search `index.html` for `Dear Poornima` and edit the letter so it sounds like you.
- Search for `MEMORY_01`, `MEMORY_02`, and `MEMORY_03` to update the memory-card titles and text.
- To add photos, replace a `<div class="memory-visual ...">...</div>` with an image, for example:
  `<img class="memory-photo" src="images/childhood.jpg" alt="A favourite memory with Poornima">`
  Then add this CSS:
  `.memory-photo { width: 100%; height: 280px; object-fit: cover; display: block; }`
- If you add photos, create an `images` folder in the repository and upload the files there. Use relative paths such as `images/childhood.jpg`.
- Update `BUILD 10.31.26` in `index.html` if you want a different build date.

## Notes
- The page does not require an API key, backend, or paid service.
- The sound effect is synthesized locally by the browser and is optional.
- The website is responsive and respects the device's reduced-motion preference.
