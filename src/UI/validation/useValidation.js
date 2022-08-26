import { useReducer } from "react";
import useValidationUtils from "./useValidationUtils";

const checkFormReducer = (state, action) => {

    if (action.state === 'reset') {
        return createNewObj(action.obj);
    }

    var _newState = null;

    if (action.state === 'update') {
        
        var _newState = createNewObj(action.obj);
    } else {
        _newState = createNewObj(state);

        _newState.form[action.key].value = action.value;
        _newState.form[action.key].isValid = action.isValid;
        
    }





    const _formKeys = Object.keys(_newState.form);

    _newState.isFormValid = true;
    for (var i = 0; i < _formKeys.length; i++) {
        var _key = _formKeys[i];
        var _isValid = _newState.form[_key].isValid

        if (!_isValid) {
            _newState.isFormValid = false;
        }

    }

    return _newState;

}

const createNewObj = (_formObject) => {
    var _newObj = {
        isFormValid: _formObject.isFormValid
    }

    const _formKeys = Object.keys(_formObject.form);
    var _form = {}
    for (var i = 0; i < _formKeys.length; i++) {
        var _key = _formKeys[i];
        _form[_key] = {
            value: _formObject.form[_key].value,
            isValid: _formObject.form[_key].isValid,
            vtype: _formObject.form[_key].vtype
        }
    }

    _newObj['form'] = _form;

    return _newObj;
}

const useValidation = (formObjectInit) => {

    if (formObjectInit == null) {
        console.error("formObjectInit props is Missing into useValidation hook!!!")
    }

    
    const [formObject, formDispatcher] = useReducer(checkFormReducer, formObjectInit);

    
    const { setValue } = useValidationUtils(formObject, formDispatcher);

    const reset = () => {
        formDispatcher({
            obj: formObjectInit,
            state: 'reset'
        })
    }

    const update = (_formObject) =>{
        formDispatcher({
            obj: _formObject,
            state: 'update'
        })
    }

    return {
        formObject,
        formDispatcher,
        reset,
        setValue,
        update
    }
}

export default useValidation;