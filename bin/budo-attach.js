const path = require('path');
const reloader = require('shader-reload/server');

module.exports = function budoAttach (budoApp) {
  let wss;
  return budoApp
    .live()
    .watch()
    .on('connect', ev => {
      wss = ev.webSocketServer;
    })
    .on('watch', (e, file) => {
      // Regular CSS/HTML reload for budo
      const ext = path.extname(file);
      if (ext && /\.(css|html?)$/i.test(ext)) {
        budoApp.reload(file);
      }
    })
    .on('bundle-error', (err) => {
      // Check if there was an error in .shader.js
      // If so, report it in the client so the user sees
      // it without having to check their terminal window.
      if (wss && reloader.isShaderError(err)) {
        const event = JSON.stringify(reloader.getErrorEvent(err));
        wss.clients.forEach(client => {
          client.send(event);
        });
      }
    })
    .on('update', function (src, deps) {
      if (wss && reloader.isShaderReload(deps)) {
        // Shader reload event, send the message data
        const event = JSON.stringify(reloader.getEvent(deps));
        wss.clients.forEach(client => {
          client.send(event);
        });
      } else {
        // Regular JS file reload
        budoApp.reload();
      }
    });
};
