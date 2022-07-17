import React, { useState } from 'react';
import './Panel.css';
import { startCapturing, stopCapturing, getMessages } from '../../capturer';
import DataGrid from 'react-data-grid';

const INTERVAL = 333;

const commonColumnProperties = {
  resizable: true,
  sortable: true,
  filterable: true,
};

const columns = [
  { key: 'id', name: 'ID', width: 50, frozen: true },
  { key: 'time', name: 'Time', width: 150, frozen: true },
  { key: 'message', name: 'Message' },
].map((c) => ({ ...c, ...commonColumnProperties }));

const Panel = () => {
  const [capturing, setCapturing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState(null);

  const addMessages = () => {
    getMessages()
      .then((messages) => {
        setMessages((oldMessages) => [...oldMessages, ...messages]);
      })
      .catch((error) => {
        console.error('Getting messages failed!');
        console.error(error.stack || error);
      });
  };

  const start = () => {
    startCapturing()
      .then(() => {
        setCapturing(true);
        setTimer(setInterval(() => addMessages(), INTERVAL));
      })
      .catch((error) => {
        console.error('Starting capturing failed!');
        console.error(error.stack || error);
      });
  };

  const stop = () => {
    stopCapturing()
      .then(() => {
        setCapturing(false);
        clearInterval(timer);
        setTimer(null);
      })
      .catch((error) => {
        console.error('Stoping capturing failed!');
        console.error(error.stack || error);
      });
  };

  return (
    <div>
      <button onClick={start}>startCapturing</button>
      <button onClick={stop}>stopCapturing</button>
      <p>{capturing ? 'capturing' : 'not capturing'}</p>

      <DataGrid
        columns={columns}
        rows={messages.map((msg, index) => {
          return {
            id: index,
            time: msg.time,
            message: msg.msg,
          };
        })}
        rowKeyGetter={row => row.id}
        headerRowHeight={30}
        rowHeight={20}
      />
    </div>
  );
};

export default Panel;
