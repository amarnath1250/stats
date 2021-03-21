import React, { useState, useEffect, PropsWithChildren } from 'react';
import Status from '../Status/Status'
import TableData from '../TableData/TableData';

interface APIResponse {
    [key: string]: any;
}

interface BoardProps {
    boardName: string;
    url: string;
    setExpandedBoard: (board:string) => void
}

export default function Board( { boardName, url, setExpandedBoard }: PropsWithChildren<BoardProps>) {
    const [data, setData] = useState<APIResponse>({});
    const [expand, setExpand] = useState(() => {
        if(localStorage.getItem('expanded-board') && localStorage.getItem('expanded-board') !== 'ALL'){
            return true;
        }
        return false;
    });

    useEffect(() => {
        fetch(`http://13.232.99.42:80/${url}`)
          .then(response => response.json())
          .then(res => {
            setData(res.data);
        })
    }, [url]);
    
    const sortItems = (event:any) => {
        if(event.target.value === 'value'){
            const sortedData = data.dataSet.data.sort((valA:any, valB:any) => {
                return valA.value - valB.value;
            })
            data.dataSet.data = sortedData;
            setData({...data});
        }else{
            const sortedData = data.dataSet.data.sort((valA:any, valB:any) => {
                console.log(valA.label.localeCompare(valB.value));
                return valA.label.localeCompare(valB.label);
            })
            data.dataSet.data = sortedData;
            setData({...data});
        }
    }

    const handleExpand = (boardName:string) => {
        setExpand(prevState => !prevState);
        if(expand){
            setExpandedBoard('ALL');
        }else{
            setExpandedBoard(boardName);    
        }
    }

    return (
        <div className="board-wrapper">
            <header className="board-header">
                <h3>{boardName}</h3>
                <div className="header-functionality">
                    <select name="sort-option" onChange={sortItems} className="sort-option form-select">
                        <option value="label">Sort by Label</option>
                        <option value="value">Sort by Value</option>
                    </select>
                    <div className="btn btn-primary max-min" onClick={() => handleExpand(boardName)}>
                        <i className={`fa ${expand ? 'fa-minus' : 'fa-arrows-alt'}`}></i>
                    </div>
                </div>
            </header>
            <div className="board-content">
                <div className="data-stats">
                    {data && data.stats && <Status stats={data.stats} url={url} />}
                </div>
                <div className="data-info">
                    {data && <TableData data={data}/>}
                </div>
            </div>
        </div>
    )
}
