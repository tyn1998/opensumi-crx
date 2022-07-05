chrome.devtools.inspectedWindow.eval(`console.log('你好牛你好牛')`);

chrome.devtools.inspectedWindow
  .eval(`window.__OPENSUMI_DEVTOOL_EVENT_SOURCE_TOKEN__ = {
    traffic: {
      send: (msg) => {
          console.log('[send] ', msg)
      },
      receive: (msg) => {
          console.log('[receive] ', msg)
      },
    },
  };
`);

chrome.devtools.panels.create(
  'OpenSumi Communication Monitor',
  'opensumi.png',
  'panel.html'
);
