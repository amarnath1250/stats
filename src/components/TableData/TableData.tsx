import React, {PropsWithChildren} from 'react';

interface TableProps {
    data: any
}

export default function TableData({data}: PropsWithChildren<TableProps>) {
    return (
        <>
            <div className="thhead">
                <div className="thhead-label">{data.filter && data.filter.label}</div>
                <div className="thhead-value">{data.filter && data.filter.value}%</div>
            </div>
            <div className="trhead">
                <div className="trhead-label">{data.dataSet && data.dataSet.header && data.dataSet.header[0]}</div>
                <div className="trhead-value">{data.dataSet && data.dataSet.header && data.dataSet.header[1]}</div>
            </div>
            <div className="tr-wrapper">
                {data.dataSet && data.dataSet.data && data.dataSet.data.map((val:any, index:number) => (
                    <div className="tr" style={{color: `${val.color}`}} key={index}>
                        <div className="td">{val.label}</div>
                        <div className="td">{val.value}</div>
                    </div>
                ))}
            </div>
        </>
    )
}
