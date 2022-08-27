import DateInput from "./DateInput";
import Label from "./Label";

const FormDateInput = ({label ,...props}) => {


    return <>

        <Label {...props} className='form-label'>{label}</Label>
        <DateInput {...props} className ='form-control'/>

    </>

}

export default FormDateInput;