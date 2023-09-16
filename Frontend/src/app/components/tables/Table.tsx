import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    MouseEventHandler,
    ReactNode,
  } from "react";
  
  interface Column {
    text: string;
    ref: React.RefObject<HTMLDivElement>;
  }
  
  interface TableProps {
    headers: string[];
    minCellWidth: number;
    tableContent: ReactNode;
  }
  
  const createHeaders = (headers: string[]): Column[] => {
    return headers.map((item) => ({
      text: item,
      ref: useRef<HTMLDivElement>(null),
    }));
  };
  
  const TableFrame: React.FC<TableProps> = ({ headers, minCellWidth, tableContent }) => {
    const [tableHeight, setTableHeight] = useState<string>("auto");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const tableElement = useRef<HTMLTableElement>(null);
    const columns = createHeaders(headers);
  
    useEffect(() => {
      if (tableElement.current) {
        setTableHeight(`${tableElement.current.offsetHeight}px`);
      }
    }, []);
  
    const mouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      const index = Number(e.currentTarget.dataset.index);
      setActiveIndex(index);
    };
  
    const mouseMove = useCallback(
      (e: MouseEvent) => {
        if (activeIndex !== null && columns[activeIndex]?.ref.current) {
          const gridColumns = columns.map((col, i) => {
            if (i === activeIndex) {
              const width = e.clientX - col.ref.current!.offsetLeft;
  
              if (width >= minCellWidth) {
                return `${width}px`;
              }
            }
            return `${col.ref.current!.offsetWidth}px`;
          });
  
          if (tableElement.current) {
            tableElement.current.style.gridTemplateColumns = gridColumns.join(" ");
          }
        }
      },
      [activeIndex, columns, minCellWidth]
    );
  
    const removeListeners = useCallback(() => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", removeListeners);
    }, [mouseMove]);
  
    const mouseUp = useCallback(() => {
      setActiveIndex(null);
      removeListeners();
    }, [setActiveIndex, removeListeners]);
  
    useEffect(() => {
      if (activeIndex !== null) {
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
      }
  
      return () => {
        removeListeners();
      };
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);
  
    const resetTableCells = () => {
      if (tableElement.current) {
        tableElement.current.style.gridTemplateColumns = "";
      }
    };
  
    return (
      <div className="container">
        <div className="table-wrapper">
          <table  className="resizeable-table" ref={tableElement}>
            <thead>
              <tr>
                {columns.map(({ ref, text }, i) => (
                  <th key={text}>
                    {text}
                    <div
                      style={{ height: tableHeight }}
                      onMouseDown={mouseDown}
                      data-index={i}
                      className={`resize-handle ${
                        activeIndex === i ? "active" : "idle"
                      }`}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            {tableContent}
          </table>
        </div>
        {/* <button onClick={resetTableCells}>Reset</button> */}
      </div>
    );
  };
  
  export default TableFrame;
  