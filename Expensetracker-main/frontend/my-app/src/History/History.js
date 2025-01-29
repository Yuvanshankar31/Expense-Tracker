import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    /* Container for the history items */
    .history-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        transition: all 0.3s ease-in-out;

        /* Hover effect for history items */
        &:hover {
            background: #F1E3F3;
            transform: translateY(-5px);
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }

        /* Adding subtle active click effect */
        &:active {
            transform: scale(0.98);
        }

        /* Transition for smooth background change */
        &:not(:hover) {
            transition: background 0.3s ease-in-out;
        }
        
        /* Adding subtle animation on load for the items */
        animation: fadeIn 0.3s ease-out;
        
        /* Keyframes for fade-in animation */
        @keyframes fadeIn {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    /* Optional: Add a hover effect for any icon or additional elements inside the history item */
    .history-item i {
        font-size: 1.5rem;
        color: rgba(34, 34, 96, 0.6);
        transition: all 0.3s ease;

        &:hover {
            color: rgba(34, 34, 96, 1);
            transform: scale(1.1);
        }
    }
`;

export default History