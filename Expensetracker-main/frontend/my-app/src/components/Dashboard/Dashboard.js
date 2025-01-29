    import React, { useEffect } from 'react'
    import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';
import { useGlobalContext } from '../../context/globalContext';
import { dollar } from '../../utils/Icons';
import History from '../../History/History';

    function Dashboard() {
        const{incomes, expenses,totalExpenses, totalIncome, totalBalance, getIncomes,getExpenses,transactionHistory} =  useGlobalContext()

        useEffect(() => {
            getIncomes()
            getExpenses()
        },[])
    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className='stats-con'>
                    <div className='chart-con'>
                        <Chart/>
                        <div className="amount-con">
                        <div className='income'>
                            <h2>Total Income</h2>
                            <p>
                                {dollar} {totalIncome()}
                            </p>
                        </div>
                        <div className='expense'>
                            <h2>Total Expenses</h2>
                            <p>
                                {dollar} {totalExpenses()}
                            </p>
                        </div>
                        <div className="balance">
                            <h2>Total  Balance</h2>
                            <p>
                                {dollar} {totalBalance()}
                            </p>
                        </div>
                        </div>

                    </div>
                    <div className="history-con">
                        <History/>
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                {Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                {Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expenses</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                {Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                {Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
    }
    const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        .chart-con {
            grid-column: 1 / 4;
            height: 400px;

            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;

                .income, .expense {
                    grid-column: span 2;
                }

                .income, .expense, .balance {
                    background: linear-gradient(135deg, #7EBF7E, #A6E4A6);  /* Slightly darker green gradient */
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;

                    p {
                        font-size: 3.5rem;
                        font-weight: 700;
                        color: white;
                        z-index: 1;
                    }

                    &:hover {
                        background: linear-gradient(135deg, #A6E4A6, #7EBF7E);  /* Inverted dark green gradient */
                        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
                        transform: translateY(-3px);
                    }

                    &:hover::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(255, 255, 255, 0.2);
                        z-index: 0;
                    }
                }

                .expense {
                    grid-column: span 2;
                    background: linear-gradient(135deg,rgb(244, 145, 145), #FF9999);  /* Slightly darker red gradient */
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;

                    p {
                        font-size: 3.5rem;
                        font-weight: 700;
                        color: white;
                        z-index: 1;
                    }

                    &:hover {
                        background: linear-gradient(135deg, #FF9999, #FF6666);  /* Inverted darker red gradient */
                        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
                        transform: translateY(-3px);
                    }

                    &:hover::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(255, 255, 255, 0.2);
                        z-index: 0;
                    }
                }

                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    p {
                        color: white;  /* Darker green for balance */
                        opacity: 0.8;
                        font-size: 4.5rem;
                    }

                    background: linear-gradient(135deg,rgb(91, 177, 243), #B3E0FF);  /* Light blue gradient for balance */
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;

                    &:hover {
                        background: linear-gradient(135deg, #B3E0FF, #A6D8FF);  /* Inverted light blue gradient */
                        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
                        transform: translateY(-3px);
                    }

                    &:hover::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(255, 255, 255, 0.2);
                        z-index: 0;
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;

            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .salary-title {
                font-size: 1.2rem;

                span {
                    font-size: 1.8rem;
                }
            }

            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.3s ease;

                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }

                &:hover {
                    background-color: #e3d8d8;  /* Light background on hover for salary items */
                    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
                    transform: translateY(-3px);
                }
            }
        }
    }
`;

export default Dashboard;
