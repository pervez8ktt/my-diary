import { useCallback } from "react";
import useHttp from "../UI/http/useHttp";

const useExpenses = () => {

    const { isLoading, localId ,sendRequest: sendTaskRequest, parseResult } = useHttp();

    const getAccountList = useCallback((_result) => {

        sendTaskRequest(
            {
                url: '/expenses/' + localId + "/accounts.json?",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(parseResult(response))
                
            }
        );

    },[]);

    const getExpenses = useCallback(({accountIndex},_result) => {



        sendTaskRequest(
            {
                url: '/expenses/' + localId + "/accounts/"+accountIndex+"/expenses.json",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(parseResult(response))
                
            }
        );

    },[]);

    const addAccount = useCallback(({
        title,
        accountStatus
    }, _result) =>{

        const _obj = {
            title,
            accountStatus
        }

        sendTaskRequest(
            {
                url: '/expenses/' + localId + "/accounts.json",
                method: 'POST',
                body: _obj,
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)
                
            }
        );

    },[]);

    const editAccount = useCallback(({
        title,
        accountStatus,
        id
    }, _result) =>{

        const _obj = {
            title,
            accountStatus
        }

        sendTaskRequest(
            {
                url: '/expenses/' + localId + "/accounts/"+id+".json",
                method: 'PUT',
                body: _obj,
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)
                
            }
        );

    },[]);

    const deleteAccount = useCallback(({
        id
    }, _result) =>{

        const _obj = {}

        sendTaskRequest(
            {
                url: '/expenses/' + localId + "/accounts/"+id+".json",
                method: 'DELETE',
                body: _obj,
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)
                
            }
        );

    },[]);

    const addExpenses = useCallback(({
        accountIndex,
        perticular,
        type,
        amount,
        date
        
    }, _result) =>{

        const _obj = {
            perticular,
            type,
            amount: parseFloat(amount),
            date
        }

        sendTaskRequest(
            {
                url: '/expenses/' + localId + "/accounts/"+accountIndex+"/expenses.json",
                method: 'POST',
                body: _obj,
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)
                
            }
        );

    },[]);

    const deleteExpense = useCallback(({accountIndex, expenseIndex},_result) => {



        sendTaskRequest(
            {
                url: '/expenses/' + localId + "/accounts/"+accountIndex+"/expenses/"+expenseIndex+".json",
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)
                
            }
        );

    },[]);


    return {
        getAccountList,
        getExpenses,
        addAccount,
        addExpenses,
        deleteExpense,
        editAccount,
        deleteAccount,
        isLoading
        
    }

}

export const ExpensesType = {
    Plus: "+",
    Minus: "-"
}

export const AccountStatus = {
    Active:"Active",
    Closed:"Closed"
}

export default useExpenses;