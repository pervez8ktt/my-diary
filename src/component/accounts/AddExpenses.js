import { Button, Modal } from "react-bootstrap";
import useExpenses, { AccountStatus, ExpensesType } from "../../data/useExpenses";
import FormDateInput from "../../UI/form/FormDateInput";
import FormInput from "../../UI/form/FormInput";
import FormSelect from "../../UI/form/FormSelect";
import ModalRef from "../../UI/form/ModalRef";
import useValidation from "../../UI/validation/useValidation";
import ValidationV2 from "../../UI/validation/ValidationV2";

const AddExpenses = ({show,handleClose, accountIndex}) => {

    const _formObject = {
        isFormValid: false,
        form:{
            perticular:{
                value:'',
                isValid:false,
                vtype:[
                    {
                        type:'required',
                        error:'Title is required'
                    }
                ]
            },
            type:{
                value:ExpensesType.Plus,
                isValid:true,
                vtype:[
                    {
                        type:'required',
                        error:'Type is required'
                    }
                ]
            },
            amount:{
                value:'',
                isValid:false,
                vtype:[
                    {
                        type:'required',
                        error:'Amount is required'
                    }
                ]
            },
            date:{
                value:new Date(),
                isValid:true,
                vtype:[
                    
                ]
            }
        }
    }

    const {formObject, formDispatcher, reset} = useValidation(_formObject);

    const{addExpenses, isLoading} = useExpenses();


    const handleOnSubmit = () =>{
        if(!formObject.isFormValid){
            return
        }
        var _obj = {
            accountIndex,
            perticular: formObject.form.perticular.value,
            type: formObject.form.type.value,
            amount: formObject.form.amount.value,
            date: formObject.form.date.value
            
        }
        

        addExpenses(_obj,(_result)=>{
            reset()
            handleClose(_result)
        })
    }

    return <ModalRef>

    <Modal
     show={show} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>Add Expenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <ValidationV2 formObject={formObject} formDispatcher={formDispatcher} formObjectInit={_formObject}>

                <FormInput type="text" label="Perticular" placeholder="Enter perticular" name="perticular" value={formObject.form.perticular.value}/>
                <FormSelect label="Expense Type" name="type" value={formObject.form.type.value}>
                    <option value={ExpensesType.Plus}>{ExpensesType.Plus}</option>
                    <option value={ExpensesType.Minus}>{ExpensesType.Minus}</option>
                </FormSelect>
                <FormInput type="number" label="Amount" placeholder="Enter amount" name="amount" value={formObject.form.amount.value}/>
                <FormDateInput label={"Transaction Date"} name="date" value={formObject.form.date.value} />
                
            </ValidationV2>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button disabled={ isLoading || !formObject.isFormValid?"disabled":''} variant="primary" onClick={handleOnSubmit}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>


</ModalRef>
}

export default AddExpenses;