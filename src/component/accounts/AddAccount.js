import { Button, Modal } from "react-bootstrap";
import useExpenses, { AccountStatus } from "../../data/useExpenses";
import FormInput from "../../UI/form/FormInput";
import ModalRef from "../../UI/form/ModalRef";
import useValidation from "../../UI/validation/useValidation";
import ValidationV2 from "../../UI/validation/ValidationV2";

const AddAccount = ({show,handleClose}) => {

    const _formObject = {
        isFormValid: false,
        form:{
            title:{
                value:'',
                isValid:false,
                vtype:[
                    {
                        type:'required',
                        error:'Title is required'
                    }
                ]
            }
        }
    }

    const {formObject, formDispatcher} = useValidation(_formObject);

    const{addAccount, isLoading} = useExpenses();

    const handleOnSubmit = () =>{
        if(!formObject.isFormValid){
            return
        }
        let _obj = {
            title: formObject.form.title.value,
            accountStatus: AccountStatus.Active
        }

        addAccount(_obj,(_result)=>{
            handleClose(_result)
        })
    }

    return <ModalRef>

    <Modal
     show={show} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <ValidationV2 formObject={formObject} formDispatcher={formDispatcher} formObjectInit={_formObject}>

                <FormInput type="text" label="Title" placeholder="Enter account title" name="title" value={formObject.form.title.value}/>
                
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

export default AddAccount;