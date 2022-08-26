import { useContext, useEffect, useState } from "react";
import ValidationContext from "../validation/validation-context";
import ErrorMessage from "./ErrorMessage";

const Input = (props) => {

    var _value = props.value==null?'':props.value;
    const validationContext = useContext(ValidationContext)

    var className = props.className != null ? props.className : 'form-control'
    
    const [value, setValue] = useState('');

    useEffect(()=>{
        setValue(_value)
    },[_value])
    
    //console.info(props.name+" :  "+_value)

    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInit, setIsInit] = useState(false);
    
    const checkValid = (value) => {
        try{
            const {isValid, error} = validationContext.isValid(value, {...props})
            setIsValid(isValid);
            setErrorMessage(error);
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{

        const timmer = setTimeout(()=>{
            if(isInit){
                checkValid(value)
            }
        },100)

        return ()=>{
            clearTimeout(timmer)
        }
        
    },[value, isInit])

    const handleOnChange = (e) => {
        
        setValue(e.target.value);
        setIsInit(true);
        try{
            props.onChange(e)
        }catch(e){

        }
    }

    const handleOnBlur = (e) => {
        setIsInit(true)
        
        try{
            props.onBlur(e);
        }catch(e){

        }
    }

    return <>

        <input type={props.type} readOnly={props.readOnly} placeholder={props.placeholder} className={className} value={value} onChange={handleOnChange} onBlur={handleOnBlur}/>
        <ErrorMessage isValid={isValid} errorMessage={errorMessage}/>
    </>

}

export default Input;