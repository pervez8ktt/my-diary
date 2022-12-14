import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useDeduction from "../../data/useDeduction";
import useHoliday from "../../data/useHoliday";
import useNotes from "../../data/useNotes";
import FormInput from "../../UI/form/FormInput";
import FormSelect from "../../UI/form/FormSelect";
import ModalRef from "../../UI/form/ModalRef";
import Validation from "../../UI/validation/Validation";

const _formObject = {
    isFormValid:false,
    form:{
        title:{
            isValid:false,
            value:'',
            vtype:[
                {
                    type:'required',
                    error:'Title is required'
                }
            ]
        }

    }
    
}

const Notes = (props) => {

    const title = props.title;
    _formObject.form.title.value = title;
    const [formObject, setFormObject] = useState(_formObject);

    //const { , localId ,sendRequest: sendTaskRequest } = useHttp();

    const {isLoading, set} = useNotes();

    const date = props.date;
    const month = props.month;
    const year = props.year;
    
    //const lastIndex = 0;

    const handleOnSubmit = (e) => {
        const _obj = {
            date,
            title: formObject.form.title.value,
            month,
            year
        }

        set(_obj,(result)=>{
            console.info(result);
            props.updateNotesHandler()
            handleClose();
        });
        
    }

    const [show, setShow] = props.addShowState;

    
    const handleClose = () => {
        setFormObject(_formObject)
        setShow(false);
    }
    

    return <ModalRef>

        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Add Notes</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Validation setFormObject={setFormObject} formObject={formObject}>

                    <FormInput type="text" label="Title" placeholder="Enter holiday title" name="title"/>
                    
                </Validation>

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

export default Notes;