import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {incomes, expenses} = useGlobalContext()

    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }


    return (
        <ChartStyled >
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    transition: all 0.3s ease-in-out;  // Smooth transitions for all changes

    // Hover effect: Highlight and scale the chart
    &:hover {
        background-color: #f1ebf2;  // Slightly darken the background on hover
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);  // Increase shadow to give depth
        transform: scale(1.03);  // Slight zoom effect
    }

    // Active or click effect: Slightly shrink and change shadow
    &:active {
        transform: scale(0.98);  // Slight shrink effect when clicked
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);  // Shrink shadow
    }

    // Focus state (for accessibility, e.g., keyboard navigation)
    &:focus {
        outline: 3px solid var(--color-accent);  // Outline for focus
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);  // Glow effect when focused
    }

    // Disabled state: If the chart should be in a disabled state
    &:disabled {
        background-color: #f4f4f4;  // Lighter background for disabled state
        box-shadow: none;  // Remove shadow
        cursor: not-allowed;  // Indicate it's disabled
    }

    // Optional: Add support for dynamic background color changes
    ${({ bgColor }) => bgColor && `
        background-color: ${bgColor};
    `}
`;



export default Chart