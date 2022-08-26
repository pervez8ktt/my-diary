import { useCallback } from "react";
import useHttp from "../UI/http/useHttp";

const useNotes = () => {

    const { isLoading, localId ,sendRequest: sendTaskRequest } = useHttp();

    const getListByYearAndMonth = useCallback(({year,month},_result) => {

        sendTaskRequest(
            {
                url: '/notes/' + localId + "/notes/"+year+"/"+month+".json",
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

    },[]);

    const set = useCallback(({
        date,
        title,
        month,
        year
    }, _result) =>{

        const _obj = {
            title
        }

        sendTaskRequest(
            {
                url: '/notes/' + localId + "/notes/"+year+"/"+month+"/"+date+".json",
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


    return {
        set,
        isLoading,
        getListByYearAndMonth
    }

}

export default useNotes;