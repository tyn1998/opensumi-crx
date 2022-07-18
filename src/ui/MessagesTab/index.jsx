import React, { useState, useEffect, useRef, useMemo } from 'react';
import { startCapturing, stopCapturing, getMessages } from '../../capturer';
import DataGrid from 'react-data-grid';

const INTERVAL = 500;

const commonColumnProperties = {
  resizable: true,
};

const columns = [
  { key: 'id', name: 'ID', minWidth: 40, width: 50, frozen: true },
  { key: 'time', name: 'Time', width: 130, frozen: true },
  { key: 'message', name: 'Message' },
].map((c) => ({ ...c, ...commonColumnProperties }));

const MessagesTab = () => {
  const [capturing, setCapturing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState(null);
  const [bottomRow, setBottomRow] = useState(-1);
  const [autoScroll, setAutoScroll] = useState(true);
  const [filter, setFilter] = useState('');

  const gridRef = useRef(null);

  // run if autoScroll or bottomRow changes
  useEffect(() => {
    gridRef.current && autoScroll && gridRef.current.scrollToRow(bottomRow);
  }, [autoScroll, bottomRow]);

  const addMessages = () => {
    getMessages()
      .then((newMessages) => {
        setMessages((oldMessages) => [...oldMessages, ...newMessages]);
        if (newMessages.length > 0) {
          setBottomRow((oldBottomRow) => oldBottomRow + newMessages.length);
        }
      })
      .catch((error) => {
        console.error('Getting messages failed!');
        console.error(error.stack || error);
      });
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const filteredRows = useMemo(() => {
    return messages
      .map((msg, index) => {
        return {
          id: index,
          time: msg.time,
          message: msg.msg,
        };
      })
      .filter((r) => {
        if (filter === '') return true;
        for (let value of Object.values(r)) {
          if (typeof value !== 'string') value = value.toString();
          if (value.includes(filter)) return true;
        }
        return false;
      });
  }, [messages, filter]);

  const toggleCapturing = () => {
    if (capturing === true) {
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
    } else {
      startCapturing()
        .then(() => {
          setCapturing(true);
          setTimer(setInterval(() => addMessages(), INTERVAL));
        })
        .catch((error) => {
          console.error('Starting capturing failed!');
          console.error(error.stack || error);
        });
    }
  };

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  const clearFilter = () => {
    setFilter('');
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          gap: '5px',
        }}
      >
        <button onClick={toggleCapturing}>toggleCapturing</button>
        <button onClick={clearMessages}>clearMessages</button>
        <button onClick={toggleAutoScroll}>toggleAutoScroll</button>
        <input
          key="filter"
          style={{ flexGrow: 1 }}
          placeholder="Filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <button onClick={clearFilter}>clearFilter</button>
      </div>

      <DataGrid
        style={{ fontSize: '10px', height: 'calc(100vh - 78px' }}
        ref={gridRef}
        columns={columns}
        rows={filteredRows}
        rowKeyGetter={(row) => row.id}
        headerRowHeight={30}
        rowHeight={20}
      />
    </div>
  );
};

export default MessagesTab;
