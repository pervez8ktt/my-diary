import ValidationType from "./ValidationType";

const useValidationUtils = (formObject,formDispatcher) => {

    const setValue = (_key,value) => {
        var _isValid = true;
        var _error = "";
 
        
        if(_key==null){
            return {
                isValid: true,
                error: ''
            }
        }

        try {
            const _vTypes = formObject.form[_key].vtype;

            for (var i = 0; i < _vTypes.length; i++) {
                var _vtypeObj = _vTypes[i];

                if(_vtypeObj.type==='regNegPosNum'){
                    value = parseFloat(value);
                }
                
                const validaitonFuntion = ValidationType(_vtypeObj.type)

                if(validaitonFuntion==null){
                    console.error(_vtypeObj.type+" is not a validation type!!!")
                }

                _isValid = validaitonFuntion(value);

                if(!_isValid){
                    _error = _vtypeObj.error
                    break;
                }

            }
        } catch (e) {
            //console.error(e)
        }


        
        formDispatcher({
            key: _key,
            value,
            isValid: _isValid

        })

        return {
            isValid: _isValid,
            error: _error
        }
    }

    return {
        setValue
    }

}

export default useValidationUtils;