import { Card, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { selectLearnerManagement } from 'app/store/learnerManagement';
import { selectSkillsScan } from 'app/store/skillsScan';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { SecondaryButton } from 'src/app/component/Buttons';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import html2pdf from 'html2pdf.js';


const LineChart = ({ data }) => {
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
            <Line data={chartData} options={options} />
        </div>
    );
};


const ViewResults = () => {

    const { singleData } = useSelector(selectSkillsScan);
    const { courseData } = useSelector(selectLearnerManagement);


    const [result, setResult] = useState([]);

    const handleChangeYear = (data) => {
        setResult(data.subUnit)
    }
    
    const downloadPdf = () => {
        const htmlContent = `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skill Scan Results</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #ffffff;
            color: #000000;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #000;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            font-weight: bold;
            margin-bottom: 10px;
        }
        h1 {
            font-size: 24px;
            text-align: center;
        }
        h2 {
            font-size: 20px;
            margin-top: 30px;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
        }
        ul {
            list-style-type: disc;
            margin-left: 40px;
            font-size: 16px;
        }
        li {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Results Chart for Daniel Stefan Ciapa</h1>

        <h2>Duty 1 - Maintain a Safe Working Environment</h2>
        <p>Ensure that any hazards are controlled or removed in line with organisational procedures.</p>

        <h2>Skills</h2>
        <ul>
            <li>S1: Conduct risk assessments within the working environment.</li>
            <li>S2: Apply safe working practices in line with associated health and safety legislation and company policy.</li>
            <li>S7: Communicate with others verbally, for example, internal and external customers, colleagues, and managers.</li>
            <li>S9: Load and unload products, considering the product that is to be moved and its current and planned destination.</li>
            <li>S15: Identify and escalate problems beyond own responsibility.</li>
            <li>S16: Follow procedures in line with environmental and sustainability regulations, standards, and guidance. Segregate resources for reuse, recycling, and disposal.</li>
            <li>S17: Follow equity, diversity, and inclusion rules.</li>
            <li>S18: Carry out and record learning and development activities.</li>
        </ul>

        <h2>Knowledge</h2>
        <ul>
            <li>K1: Methods to ensure safe working, for example, risk assessments, PPE, COSHH, and safe systems of work.</li>
            <li>K3: Health and safety regulations relevant to the role, organisation, and the operative's responsibilities.</li>
            <li>K4: Product handling and storage contractual requirements.</li>
            <li>K19: Principles of equity, diversity, and inclusion in the workplace and the impact on their work.</li>
        </ul>

        <h2>Behavior</h2>
        <ul>
            <li>B2: Support an inclusive workplace, for example, respectful of different views.</li>
            <li>B3: Seek learning and development opportunities.</li>
        </ul>
    </div>
</body>
</html>

        `;
    
        const element = document.createElement('div');
        element.innerHTML = htmlContent;
    
        const opt = {
            margin: 1,
            filename: 'ResultsChart.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        html2pdf().from(element).set(opt).save();
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

                    <div id="results-container">
                        <Card className=' mt-20 rounded-0 p-10 bg-grey-200'>
                            <Typography className='h4 font-600'>Gap Analysis</Typography>
                        </Card>

                        <LineChart data={result.map(a => ({ rating: a.rating, name: a.subTitle }))} />
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