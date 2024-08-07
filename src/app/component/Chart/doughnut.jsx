import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

export const data = {
    labels: ['Completed', 'Progress', 'Overdue'],
    datasets: [
        {
            label: '%',
            data: [12, 19, 3],
            backgroundColor: [
                '#58C800',
                '#FFBF00',
                '#FF002D'
            ],
            borderWidth: 1,
        },
    ],
};

export default function DoughnutChart(props) {

    const { fullyCompleted = 10, notStarted = 10, partiallyCompleted = 10, totalSubUnits = 10 } = props?.value;
    return <Doughnut data={{
        labels: ['Completed', 'Progress', 'Overdue'],
        datasets: [
            {
                label: " Sub Units",
                data: [fullyCompleted, partiallyCompleted, notStarted],
                backgroundColor: [
                    '#58C800',
                    '#FFBF00',
                    '#FF002D'
                ],
                borderWidth: 1,
            },
        ],
    }}
        width={100}
        height={100}
        options={{
            cutout: '50%',
        }} />;
}
