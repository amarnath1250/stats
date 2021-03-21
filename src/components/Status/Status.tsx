import React, {PropsWithChildren} from 'react'

interface StatsProps {
    stats: any
    url: string
}

export default function Status({stats, url}: PropsWithChildren<StatsProps>) {
    return (
        <>
            <h4 className="stats-heading">STATS:</h4>
            {Object.keys(stats).map((val:any, index: number) => (
            <React.Fragment key={index}>
                <label className="download-label">{stats[val].label}</label>
                <div className="meter">
                    <span style={{width: `${stats[val].value}%`}}><span className="progress"></span></span>
                </div>
            </React.Fragment>
            ))}
            <a href={`http://13.232.99.42/${url}`} target="_blank" className="view-api" download><span className="view-api-title">View API</span><span className="fa fa-arrow-right fa-lg"></span></a>
        </>
    )
}
