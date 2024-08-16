import { Card, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { selectLearnerManagement } from 'app/store/learnerManagement';
import { selectSkillsScan } from 'app/store/skillsScan';
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { SecondaryButton } from 'src/app/component/Buttons';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import html2pdf from 'html2pdf.js';

interface LineChartProps {
    data: { rating: any; name: any; }[];
}

const LineChart = forwardRef<any, LineChartProps>(({ data }, ref) => {
    console.log(data)
    const labels = data.map(a => a.name)

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Your rating',
                data: data.map(a => a.rating),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                min: 1,
                max: 4,
                ticks: {
                    stepSize: 1,
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '☹️';
                            case 2:
                                return '😖';
                            case 3:
                                return '🙂';
                            case 4:
                                return '😁';
                            default:
                                return value;
                        }
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
        },
    };

    return (
        <div>
            <Line ref={ref} data={chartData} options={options} />
        </div>
    );
});


const ViewResults = () => {

    const { singleData } = useSelector(selectSkillsScan);
    const { courseData } = useSelector(selectLearnerManagement);
    const chartRef = useRef<any>(null);

    const [result, setResult] = useState([]);

    const handleChangeYear = (data) => {
        setResult(data.subUnit)
    }

    const downloadPdf = () => {
        if (chartRef.current) {
            const chartInstance = chartRef.current.chartInstance || chartRef.current;
            const chartImage = chartInstance.toBase64Image();

            const htmlContent = `
      <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A4 Sized Results Chart</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>

        .a4-container {
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .chart-placeholder {
            background: #f5f5f5;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ccc;
        }

        .legend-item {
            color: #f5a623;
        }

        li {
            font-size: 10px;
            padding-bottom: 0.5rem;
        }

        .footer {
            border-top: 1px solid #e5e5e5;
            padding-top: 8px;
            text-align: left;
            color: #6b7280;
            font-size: 12px;
        }

        .footer a {
            color: #4f46e5;
            font-size: 15px;
        }

        h2 {
            font-size: 16px;
        }

        h3 {
            font-size: 14px;
        }

        p {
            font-size: 12px;
        }

        .text-lg {
            font-size: 14px;
        }

        .text-base {
            font-size: 12px;
        }

        .text-sm {
            font-size: 10px;
        }
            
        .header-box {
            height: 3.25rem;
        }

    </style>
    </head>

    <body class="bg-gray-100 flex justify-center items-center">

    <div class="a4-container">
        <div class="mb-6">
            <h2 class="text-lg font-semibold">Daniel Stefan Ciapa</h2>
            <p class="text-base font-semibold">Results Chart for Daniel Stefan Ciapa</p>
            <p class="text-sm text-gray-600 mt-2">Duty 1 - Maintain a safe working environment, ensuring that any
                hazards are controlled or removed in line with organisational procedures.</p>
        </div>

        <div class="flex gap-8 w-full">
            <div class="w-1/2">
                <div class="header-box bg-gray-200 p-2 border border-gray-300 rounded">
                    <h4 class="text-sm font-semibold">Gap Analysis</h4>
                </div>
                <div class="chart-placeholder mt-4">
                    <img src="${chartImage}" alt="Chart Image" />
                </div>
            </div>

            <div class="w-1/2">
                <div class="header-box bg-gray-200 p-2 border border-gray-300 rounded-0">
                    <h4 class="text-sm font-semibold">Legend</h4>
                </div>
                <div class="p-3 border border-gray-300 rounded">
                    <h5 class="header-box bg-gray-100 p-1 font-semibold mb-2 text-sm">Skills</h5>
                    <ul class="text-xs">
                        <li><span class="legend-item mr-1">S1</span>Conduct risk assessments within the working
                            environment.</li>
                        <li><span class="legend-item mr-1">S2</span>Apply safe working practices in line with associated
                            health and safety legislation and company policy.</li>
                        <li><span class="legend-item mr-1">S7</span>Communicate with others verbally, for example
                            internal
                            and external customers, colleagues, and managers.</li>
                        <li><span class="legend-item mr-1">S9</span>Load and unload products, considering the product
                            that is
                            to be moved and its current and planned destination.</li>
                        <li><span class="legend-item mr-1">S15 </span>Identify and escalate problems beyond own
                            responsibility.</li>
                        <li><span class="legend-item mr-1">S16 </span>Follow procedures in line with environmental and
                            sustainability regulations, standards, and guidance.</li>
                        <li><span class="legend-item mr-1">S17 </span>Follow equity, diversity and inclusion rules.</li>
                        <li><span class="legend-item mr-1">S18 </span>Carry out and record learning and development
                            activities.</li>
                    </ul>
                    <h5 class="header-box bg-gray-100 p-1 font-semibold mt-3 mb-2 text-sm">Knowledge</h5>
                    <ul class="text-xs">
                        <li><span class="legend-item mr-1">K1</span> Methods to ensure safe working, for example, risk
                            assessments, PPE,
                            COSHH and safe systems of work.</li>
                        <li><span class="legend-item mr-1">K3</span> Health and safety regulations relevant to the role,
                            organisation and
                            the operative's responsibilities.</li>
                        <li><span class="legend-item mr-1">K4</span> Product handling and storage contractual
                            requirements.</li>
                        <li><span class="legend-item mr-1">K19</span> Principles of equity, diversity, and inclusion in
                            the workplace and
                            the impact on their work.</li>
                    </ul>
                    <h5 class="header-box bg-gray-100 p-1 font-semibold mt-3 mb-2 text-sm">Behaviour</h5>
                    <ul class="text-xs">
                        <li><span class="legend-item mr-1">B2</span> Support an inclusive workplace, for example,
                            respectful of different
                            views.</li>
                        <li><span class="legend-item mr-1">B3</span> Seek learning and development opportunities.</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer my-8 flex justify-between text-sm">
            <div>
               <p class="mb-8 text-sm"> © Copyright 2024 Smart Assessor: Next Generation E-portfolio Software</p>
                <div class="mt-1 flex gap-4">
                   <a href="https://www.linkedin.com" target="_blank" class="text-gray-500 hover:text-blue-700">
            <img src="/assets/icons/icon_linkedin_over.gif" alt="LinkedIn" class="w-6 h-6">
        </a>
        <a href="https://twitter.com" target="_blank" class="text-gray-500 hover:text-blue-500">
            <img src="/assets/icons/icon_twitter_over.gif" alt="Twitter" class="w-6 h-6">
        </a>
                </div>
            </div>
            <div>
                Phoenix4Training LLP
            </div>
        </div>
    </div>

    </body>

    </html>
        `;

            const element = document.createElement('div');
            element.innerHTML = htmlContent;

            const opt = {
                margin: 0.50,
                filename: 'ResultsChart.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
            };

            html2pdf().from(element).set(opt).save();
        }
    };

    return (
        <Grid className=' m-10 px-10 pt-10'>
            <Grid >
                <Typography className='h3'>Results chart for Daniel Stefan Ciapa</Typography>
            </Grid>
            <Grid className=' flex gap-28'>
                <Grid className='w-1/2'>
                    <FormControl fullWidth size="small" className='pt-20'>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            name="year"
                        >
                            {courseData.units?.map((row) => (
                                <MenuItem key={row} value={row?.title}
                                    onClick={() => handleChangeYear(row)}
                                >
                                    {row?.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div>
                        <Card className=' mt-20 rounded-0 p-10 bg-grey-200'>
                            <Typography className='h4 font-600'>Gap Analysis</Typography>
                        </Card>

                        <LineChart data={result.map(a => ({ rating: a.rating, name: a.subTitle }))} ref={chartRef} />
                    </div>
                </Grid>
                <Grid className='w-1/2' >
                    <Grid className="flex justify-start items-end my-20 mr-24 gap-10">
                        <Grid>
                            <SecondaryButton name="Save" />
                        </Grid>
                        <Grid>
                            <SecondaryButton name="Next" />
                        </Grid>
                        <Grid>
                            <SecondaryButton name="Download PDF" onClick={downloadPdf} />
                        </Grid>
                    </Grid>
                    <Card className=' mt-20 rounded-0 p-10 bg-grey-200'>
                        <Typography className='h4 font-600'>Resources</Typography>
                    </Card>
                    <Grid>
                        <Card className=' mt-20 rounded-0 p-10 bg-grey-200'>
                            <Typography className='h4 font-600'>Legend</Typography>
                        </Card>
                        <Card className='rounded-0 p-10'>
                            {courseData.units?.map((row) => (
                                <Grid>
                                    <Typography>{row?.title}</Typography>
                                </Grid>
                            ))}
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ViewResults