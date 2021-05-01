import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ResponsivePie } from '@nivo/pie'
import './card.css'

const CardPieChart = ({
    doughnut 
}) => {
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card className="card piechart" >
            
            <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
            aria-label="disabled tabs example"
            >
            <Tab label="Active" />
            <Tab label="Active" />
            <Tab label="Active" />
            <Tab label="Active" />
            </Tabs>
            <CardContent >
                <h2>Total expenses:</h2>
                <div style={{height:"200px"}} className="chart-container">
                <ResponsivePie
                data={doughnut}
                margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
                // defs={[
                //     {
                //         id: 'dots',
                //         type: 'patternDots',
                //         background: 'inherit',
                //         color: 'rgba(255, 255, 255, 0.3)',
                //         size: 4,
                //         padding: 1,
                //         stagger: true
                //     },
                //     {
                //         id: 'lines',
                //         type: 'patternLines',
                //         background: 'inherit',
                //         color: 'rgba(255, 255, 255, 0.3)',
                //         rotation: -45,
                //         lineWidth: 6,
                //         spacing: 10
                //     }
                // ]}
                // fill={[
                //     {
                //         match: {
                //             id: 'ruby'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'c'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'go'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'python'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'scala'
                //         },
                //         id: 'lines'
                //     },
                //     {
                //         match: {
                //             id: 'lisp'
                //         },
                //         id: 'lines'
                //     },
                //     {
                //         match: {
                //             id: 'elixir'
                //         },
                //         id: 'lines'
                //     },
                //     {
                //         match: {
                //             id: 'javascript'
                //         },
                //         id: 'lines'
                //     }
                // ]}
            />
            </div>
            </CardContent>
        </Card>
    )
}

export default CardPieChart
