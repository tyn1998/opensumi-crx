console.log('Content script works!');

// setInterval(() => {
//   console.log('我是content script, 向background发消息.');
//   chrome.runtime.sendMessage(
//     {
//       greeting: 'hello',
//     },
//     (res) => {
//       console.log('response from background: ', res.farewell);
//     }
//   );
// }, 2000);
//

window.location.port === '8080' &&
  window.addEventListener('message', function (event) {
    // Only accept messages from the same frame
    if (event.source !== window) {
      return;
    }

    var message = event.data;

    // Only accept messages that we know are ours
    if (
      typeof message !== 'object' ||
      message === null ||
      message.source !== 'opensumi/core'
    ) {
      return;
    }

    chrome.runtime.sendMessage(message);
  });
