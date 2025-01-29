import React from 'react'
import styled from 'styled-components'

function Button({name, icon, onClick, bg, bPad, color, bRad}) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color,
        }} onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
    padding: .8rem 1.5rem;
    border-radius: 30px;
    background-color: var(--color-primary);  // Base background color (can be passed as a prop)

    // Hover effect
    &:hover {
        background-color: var(--color-accent);  // Change color on hover
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);  // Light shadow
        transform: translateY(-3px);  // Slight lift effect
    }

    // Active state (button press)
    &:active {
        background-color: var(--color-dark);  // Darker background when pressed
        transform: translateY(1px);  // Button press effect
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);  // Shadow for active state
    }

    // Focus state (for accessibility)
    &:focus {
        outline: 3px solid var(--color-accent);  // Add a focus outline
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);  // Glow effect on focus
    }

    // Disabled state (grayscale effect, no cursor)
    &:disabled {
        background-color: #ddd;  // Grayed out background
        color: #aaa;  // Grayed out text
        cursor: not-allowed;  // Change cursor to indicate it's disabled
        transform: none;  // Remove any transform effect
    }

    // Optionally, add support for different sizes
    ${({ size }) => size === 'small' && `
        padding: .6rem 1.2rem;
        font-size: 0.9rem;
    `}
    ${({ size }) => size === 'large' && `
        padding: 1rem 2rem;
        font-size: 1.1rem;
    `}
`;



export default Button