    import React, { createContext, useContext, useState } from "react";
    import axios from "axios";

    const BASE_URL = "http://localhost:5000/api/v1"; // Base API URL
    const GlobalContext = createContext(); // Creating the context

    export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]); // State for incomes
    const [expenses, setExpenses] = useState([]); // Placeholder for expenses (not currently used)
    const [error, setError] = useState(null); // State for error handling
    //INCOME
    // Function to add a new income
    const addIncome = async (income) => {
        try {
        const response = await axios.post(`${BASE_URL}/add-income`, income);
        setIncomes((prevIncomes) => [...prevIncomes, response.data]); // Update state with the new income
        setError(null); // Clear any previous error
        } catch (err) {
        setError(err.response?.data?.message || "Something went wrong"); // Handle API error
        }
        getIncomes()
    };

    // Function to fetch all incomes
    const getIncomes = async () => {
        try {
        const response = await axios.get(`${BASE_URL}/get-incomes`);
        console.log("Fetched incomes from API:", response.data);
        setIncomes(response.data); // Update state with fetched incomes
        setError(null); // Clear any previous error
        } catch (err) {
        setError(err.response?.data?.message || "Something went wrong"); // Handle API error
        }
    };

    // Function to delete an income by ID
    const deleteIncome = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete-income/${id}`)
            console.log('Deleted Income:', response.data); // Log the deleted income for verification
            getIncomes(); // Refresh the incomes list
        } catch (error) {
            console.error('Error deleting income:', error);
        }
        getIncomes()
    };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income)=>{
            totalIncome += income.amount
        })

        return totalIncome;
    }
    

     // Function to add a new income
    const addExpense = async (income) => {
        try {
        const response = await axios.post(`${BASE_URL}/add-expense`, income);
        setIncomes((prevIncomes) => [...prevIncomes, response.data]); // Update state with the new income
        setError(null); // Clear any previous error
        } catch (err) {
        setError(err.response?.data?.message || "Something went wrong"); // Handle API error
        }
        getExpenses()
    };

    // Function to fetch all incomes
    const getExpenses = async () => {
        try {
        const response = await axios.get(`${BASE_URL}/get-expenses`);
        console.log("Fetched incomes from API:", response.data);
        setExpenses(response.data); // Update state with fetched incomes
        setError(null); // Clear any previous error
        } catch (err) {
        setError(err.response?.data?.message || "Something went wrong"); // Handle API error
        }
    };

    // Function to delete an income by ID
    const deleteExpense = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete-expense/${id}`)
            console.log('Deleted Income:', response.data); // Log the deleted income for verification
            getExpenses(); // Refresh the incomes list
        } catch (error) {
            console.error('Error deleting income:', error);
        }
        getExpenses()
    };

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income)=>{
            totalIncome += income.amount
        })

        return totalIncome;
    }
    
    const totalBalance =()=>{
        return totalIncome() - totalExpenses()
    }
    

    const transactionHistory = () => {
        const history = [...incomes,...expenses]
        history.sort((a, b)=>{
            return new Date(b.createdAt)  - new Date(a.createdAt)
        })
        return history.slice(0,3 )
    }
    
    return (
        <GlobalContext.Provider
        value={{
            incomes,
            addIncome,
            getIncomes,
            deleteIncome,
            setError, // Providing setError for direct use if necessary
            error,
            totalIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory
        }}
        >
        {children}
        </GlobalContext.Provider>
    );
    };

    // Custom hook for consuming the global context
    export const useGlobalContext = () => {
    return useContext(GlobalContext);
    };
