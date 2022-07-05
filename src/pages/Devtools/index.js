chrome.devtools.inspectedWindow.eval(`console.log('DevTools Page 加载!')`);

chrome.devtools.inspectedWindow
  .eval(`window.__OPENSUMI_DEVTOOL_EVENT_SOURCE_TOKEN__ = {
    traffic: {
      send: (msg) => {
          window.postMessage({
            method: 'send',
            msg: msg,
            source: 'opensumi/core'
          }, '*')
      },
      receive: (msg) => {
          window.postMessage({
            method: 'receive',
            msg: msg,
            source: 'opensumi/core'
          }, '*')
      },
    },
  };
`);

chrome.devtools.panels.create(
  'OpenSumi DevTools',
  'logo.png',
  'panel.html'
);
