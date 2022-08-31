import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useExpenses, { AccountStatus } from "../../data/useExpenses";
import FormInput from "../../UI/form/FormInput";
import FormSelect from "../../UI/form/FormSelect";
import ModalRef from "../../UI/form/ModalRef";
import useValidation from "../../UI/validation/useValidation";
import ValidationV2 from "../../UI/validation/ValidationV2";

const EditAccount = ({ show, handleClose, _obj }) => {


    
    const _formObject = {
        isFormValid: false,
        form: {
            title: {
                value: '',
                isValid: false,
                vtype: [
                    {
                        type: 'required',
                        error: 'Title is required'
                    }
                ]
            },
            status: {
                value: AccountStatus.Active,
                isValid: true,
                vtype: [

                ]
            }
        }
    }

    const { formObject, formDispatcher, update } = useValidation(_formObject);

    useEffect(() => {
        if (_obj != null) {
            formObject.form.title.value = _obj.title
            formObject.form.title.isValid = true

            formObject.form.status.value = _obj.accountStatus
            formObject.form.status.isValid = true

            update(formObject)

        }
    }, [_obj])

    const { editAccount, deleteAccount, isLoading } = useExpenses();

    const handleOnSubmit = () => {
        if (!formObject.isFormValid) {
            return
        }
        let _o = {
            id: _obj.id,
            title: formObject.form.title.value,
            accountStatus: formObject.form.status.value
        }

        editAccount(_o, (_result) => {
            handleClose(_result)
        })


    }

    const handleSubmitDelete = () => {

        let _d = window.confirm("Do you really want to delete?")

        if(_d){
            deleteAccount({id:_obj.id}, (_result) => {
                handleClose(_result)
            })
        }
        
    }

   

    return <ModalRef>

        <Modal
            show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <ValidationV2 formObject={formObject} formDispatcher={formDispatcher} formObjectInit={_formObject}>

                    <FormInput type="text" label="Title" placeholder="Enter account title" name="title" value={formObject.form.title.value} />
                    <FormSelect label="Account Status" name="status" value={formObject.form.status.value}>
                        <option value={AccountStatus.Active}>{AccountStatus.Active}</option>
                        <option value={AccountStatus.Closed}>{AccountStatus.Closed}</option>
                    </FormSelect>

                </ValidationV2>

            </Modal.Body>
            <Modal.Footer>

                <Button variant="danger" onClick={handleSubmitDelete}>
                    Delete
                </Button>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button disabled={isLoading || !formObject.isFormValid ? "disabled" : ''} variant="primary" onClick={handleOnSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

        {/* <Modal
            show={showDeleteModel} onHide={handleOnDelete} >
            <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <p>Do you really want to delete!!!</p>

            </Modal.Body>
            <Modal.Footer>

                <Button variant="danger" onClick={handleSubmitDelete}>
                    Delete
                </Button>

                <Button variant="secondary" onClick={handleOnDelete}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal> */}


    </ModalRef>
}

export default EditAccount;