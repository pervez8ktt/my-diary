import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthGoogleContext from "../UI/authentication/auth-google-context";
import useHttp from "../UI/http/useHttp";

const useCasualLeave = () => {

    const { isLoading, localId, sendRequest: sendTaskRequest } = useHttp();

    const getTotalLeave = (_result) => {

        sendTaskRequest(
            {
                url: '/casualLeave/' + localId + "/totalLeave.json",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)

            }
        );


    };

    const getListByMonthAndYear = ({month,year},_result) => {



        sendTaskRequest(
            {
                url: '/casualLeave/' + localId + "/casualLeaveList/"+year+"/"+month+".json",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)

            }
        );


    };

    const getListByYear = ({year},_result) => {



        sendTaskRequest(
            {
                url: '/casualLeave/' + localId + "/casualLeaveList/"+year+".json",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)

            }
        );


    };

    const getList = (_result) => {

        sendTaskRequest(
            {
                url: '/casualLeave/' + localId + "/casualLeaveList.json",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)

            }
        );


    };

    const set = useCallback(({
        month,
        year,
        earnedCl,
        totalCl
    }, _result) => {

        const _obj = {
            month,
            year,
            earnedCl:parseFloat(earnedCl)
        }

        sendTaskRequest(
            {
                url: '/casualLeave/' + localId + "/casualLeaveList/"+year+"/"+month+".json",
                method: 'put',
                body: _obj,
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                sendTaskRequest(
                    {
                        url: '/casualLeave/' + localId + "/totalLeave.json",
                        method: 'put',
                        body: {
                            totalCl:parseFloat(totalCl)
                        },
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    },
                    (response) => {
                        console.info(response);
                        _result(response)

                    });

            }
        );

    }, []);


    const setTotalLeave = useCallback(({
        totalCl
    }, _result) => {

        const _totalCl = parseFloat(totalCl)

        sendTaskRequest(
            {
                url: '/casualLeave/' + localId + "/totalLeave.json",
                method: 'put',
                body: {
                    totalCl:_totalCl
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)

            });


    }, []);

    return {
        set,
        isLoading,
        getList,
        getTotalLeave,
        setTotalLeave,
        getListByMonthAndYear,
        getListByYear
    }

}

export default useCasualLeave