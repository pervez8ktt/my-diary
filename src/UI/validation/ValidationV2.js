import { useEffect, useReducer } from "react"
import useValidationUtils from "./useValidationUtils";
import ValidationContext from "./validation-context"
import ValidationType from "./ValidationType";

const ValidationV2 = ({formObjectInit ,formObject, formDispatcher, ...props}) => {
    
    if (formObject == null) {
        console.error("formObject props is Missing into Validation!!!")
    }

    if(formDispatcher==null){
        console.error("formObject props is Missing into Validation!!!")
    }
    

    const {setValue} = useValidationUtils(formObject,formDispatcher);

    const reset = () => {
        formDispatcher({
            obj: formObjectInit,
            state: 'reset'
        })
    }


    const isValid = (value, props) => {
        var _isValid = true;
        var _error = "";
 
        var _key = props.name;

        if(_key==null){
            return {
                isValid: true,
                error: ''
            }
        }

        return setValue(_key, value)
    }


    return <ValidationContext.Provider value={{
        isValid,
        reset
    }}>

        {props.children}

    </ValidationContext.Provider>

}

export default ValidationV2;


