import React, { useState, useCallback, useEffect, useRef } from 'react';
import './ResizableTable.scss';

const createHeaders = (children) => {
  return children.map((child) => ({
    child,
    ref: useRef(),
  }));
};

const ResizableTable = ({ children, minCellWidth }) => {
  const [tableHeight, setTableHeight] = useState('auto');
  const [activeIndex, setActiveIndex] = useState(null);
  const tableElement = useRef(null);
  const columns = createHeaders(children);

  useEffect(() => {
    setTableHeight(tableElement.current.offsetHeight);
  }, []);

  const mouseDown = (index) => {
    setActiveIndex(index);
  };

  const mouseMove = useCallback(
    (e) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex) {
          const width = e.clientX - col.ref.current.offsetLeft;

          if (width >= minCellWidth) {
            return `${width}px`;
          }
        }
        return `${col.ref.current.offsetWidth}px`;
      });

      tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
        ' '
      )}`;
    },
    [activeIndex, columns, minCellWidth]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  // const resetTableCells = () => {
  //   tableElement.current.style.gridTemplateColumns = "";
  // };

  return (
    <table className="rt-table" ref={tableElement}>
      <thead>
        <tr>
          {columns.map(({ ref, child }, i) => (
            <td ref={ref} key={`rt-column-${i}`}>
              {child}
              <div
                style={{ height: tableHeight }}
                onMouseDown={() => mouseDown(i)}
                className={`rt-handle ${activeIndex === i ? 'active' : 'idle'}`}
              />
            </td>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default ResizableTable;
