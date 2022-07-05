import React, { useState, useEffect } from 'react';
import './Panel.css';

const Panel = () => {
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    // Create a connection to the background page
    var backgroundPageConnection = chrome.runtime.connect({
      name: 'panel',
    });

    // 和background建立连接后发一条消息告诉它tabId
    // 这是因为一个extension就一个background, 它要一对多
    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    // 接受来自background的消息
    backgroundPageConnection.onMessage.addListener(
      (message, sender, sendResponse) => {
        // console.log(message);
        setMsgList((msgList) => [...msgList, message]);
      }
    );
  }, []);

  return (
    <div className="container">
      <table>
        <tbody>
          {msgList.map((msg, index) => {
            return (
              <tr key={`msg_${index}`}>
                <td>{new Date().toLocaleString()}</td>
                <td>{msg.method}</td>
                <td>{JSON.stringify(msg.msg)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Panel;
