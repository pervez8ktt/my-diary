import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import useCasualLeave from '../../data/useCasualLeave';
import useConfiguration from '../../data/useConfiguration';
import useDeduction from '../../data/useDeduction';
import AuthGoogleContext from '../../UI/authentication/auth-google-context';
import FormInput from '../../UI/form/FormInput';
import FormSelect from '../../UI/form/FormSelect';
import useHttp from '../../UI/http/useHttp';
import Validation from '../../UI/validation/Validation';
import Head from '../head/Head';
import AddDeduction from './AddDeduction';
import DeductionItem from './DeductionItem';

const _configFormObj = {

    isFormValid: false,
    form: {
        salary: {
            isValid: false,
            value: '',
            vtype: [
                {
                    type: 'required',
                    error: 'Salary is required'
                }, {
                    type: 'vDec',
                    error: 'Salary should be in decimal'
                }
            ]
        },
        clPerMonth: {
            isValid: false,
            value: 0,
            vtype: [
                {
                    type: 'required',
                    error: 'CL Per Month is required'
                }, {
                    type: 'vDec',
                    error: 'CL Per Month should be number only'
                }
            ]
        },
        attandanceReqForCl: {
            isValid: false,
            value: 0,
            vtype: [
                {
                    type: 'required',
                    error: 'Attendance Required for CL is required'
                }, {
                    type: 'vDec',
                    error: 'Attendance Required for CL should be number only'
                }
            ]
        },
        saturdayOff: {
            isValid: true,
            value: 2,
            vtype: [
                {
                    type: 'required',
                    error: 'Saturday off is required'
                }
            ]
        },
        totalCl: {
            isValid: false,
            value: 0,
            vtype: [
                {
                    type: 'required',
                    error: 'Total CL is required'
                }
            ]
        }, pf: {
            value: 0,
            isValid: true,
            vtype: [{
                type: 'regNegPosNum',
                error: 'PF should be in decimal'
            }]
        }, security: {
            value: 0,
            isValid: true,
            vtype: [{
                type: 'regNegPosNum',
                error: 'Security should be in decimal'
            }]
        }, tds: {
            value: 0,
            isValid: true,
            vtype: [{
                type: 'regNegPosNum',
                error: 'TDS should be in decimal'
            }]
        }, other: {
            value: 0,
            isValid: true,
            vtype: [{
                type: 'regNegPosNum',
                error: 'Other Deductions should be in decimal'
            }]
        }

    }

}

const ConfigurationComponent = (props) => {

    const { getList } = useDeduction();

    const { isLoading, getList: getConfigList, set } = useConfiguration();

    const [configFormObj, setConfigFormObj] = useState(_configFormObj);
    const addShowState = useState(false);

    //const { isLoading, localId, sendRequest: sendTaskRequest } = useHttp();

    const [, setShowAdd] = addShowState;

    const [lastIndexDeduction, setLastIndexDeduction] = useState(-1);

    const [deductionList, setDeductionList] = useState([]);

    const hadleDeductionList = () => {
        getList((_result) => {

            const _l = _result.length - 1;
            setLastIndexDeduction(_l);



            setDeductionList(_result)
        });
    }


    const { getTotalLeave, setTotalLeave } = useCasualLeave();

    useEffect(() => {
        getTotalLeave((response) => {
            if (response != null) {
                setConfigFormObj((_obj) => {

                    _obj.form.totalCl.value = response.totalCl
                    _obj.form.totalCl.isValid = true
                    return _obj;
                });

            }
        });
    }, []);

    useEffect(() => {

        hadleDeductionList();

        getConfigList((response) => {
            console.info(response);
            if (response != null) {
                setConfigFormObj((_obj) => {
                    _obj.isFormValid = true
                    _obj.form.salary.value = response.salary
                    _obj.form.salary.isValid = true
                    _obj.form.clPerMonth.value = response.clPerMonth
                    _obj.form.clPerMonth.isValid = true
                    _obj.form.attandanceReqForCl.value = response.attandanceReqForCl
                    _obj.form.attandanceReqForCl.isValid = true
                    _obj.form.saturdayOff.value = response.saturdayOff
                    _obj.form.saturdayOff.isValid = true
                    return _obj;
                })
            }

        });


    }, [])

    const handleShowAdd = (e) => {
        setShowAdd(true)
    }

    const submitConfig = (e) => {
        const _obj = {
            salary: parseFloat(configFormObj.form.salary.value),
            clPerMonth: parseFloat(configFormObj.form.clPerMonth.value),
            attandanceReqForCl: parseFloat(configFormObj.form.attandanceReqForCl.value),
            saturdayOff: parseInt(configFormObj.form.saturdayOff.value),
            pf: parseInt(configFormObj.form.pf.value),
            security:parseInt(configFormObj.form.security.value),
            tds:parseInt(configFormObj.form.tds.value),
            other: parseInt(configFormObj.form.other.value)
        }

        set(_obj, (response) => {

        })

        setTotalLeave({ totalCl: configFormObj.form.totalCl.value }, (response) => {

        })


    }

    const [updateIndex, setUpdateIndex] = useState(null);

    const updateDeductionHandler = (_updateIndex, e) => {

        setUpdateIndex(_updateIndex)
        setShowAdd(true)
    }

    const getUpdateIndex = () => {
        return updateIndex;
    }

    const [deductionJsx, setDeductionJsx] = useState([]);

    const _deductionJsx = deductionList.map((_d, index) => {
        return <DeductionItem key={index} index={index} data={_d} updateDeductionHandler={updateDeductionHandler.bind(index)}></DeductionItem>
    });



    return <React.Fragment>

        <Head title="Configuration" />
        <AddDeduction lastIndex={lastIndexDeduction} addShowState={addShowState} hadleDeductionList={hadleDeductionList} getUpdateIndex={getUpdateIndex} setUpdateIndex={setUpdateIndex} />


        <Container>

            <h1>Configuration</h1>
            <Validation setFormObject={setConfigFormObj} formObject={configFormObj}>

                <Row>
                    <div className='col-md-3'>

                        <FormInput name="salary" type="number" label="Salary" value={configFormObj.form.salary.value}></FormInput>


                    </div>
                    <div className='col-md-3'>
                        <FormInput name="clPerMonth" type="number" label="CL Per Month" value={configFormObj.form.clPerMonth.value}></FormInput>

                    </div>
                    <div className='col-md-3'>

                        <FormInput name="attandanceReqForCl" type="number" label="Attendance Required for CL" value={configFormObj.form.attandanceReqForCl.value}></FormInput>


                    </div>
                    <div className='col-md-3'>

                        <FormInput name="totalCl" type="number" label="Total CL" value={configFormObj.form.totalCl.value}></FormInput>
                    </div>
                    <div className='col-md-3'>
                        <FormInput label="PF" value={configFormObj.form.pf.value} name="pf" type="number" />
                    </div>
                    <div className='col-md-3'>
                        <FormInput label="Security" value={configFormObj.form.security.value} name="security" type="number" />
                    </div>
                    <div className='col-md-3'>
                        <FormInput label="TDS" value={configFormObj.form.tds.value} name="tds" type="number" />
                    </div>
                    <div className='col-md-3'>
                        <FormInput label="Other" value={configFormObj.form.other.value} name="other" type="number" />

                    </div>

                    <div className='col-md-3'>
                        <FormSelect name="saturdayOff" label="Seturday Off" className="form-select" aria-label="Default select example" value={configFormObj.form.saturdayOff.value}>
                            <option value={1}>All Saturday Off</option>
                            <option value={2}>Second and fourth Saturday Off</option>
                            <option value={3}>No Off</option>


                        </FormSelect>
                    </div>



                </Row>
                <Row>
                    <div className='col-md-3'>
                        <button disabled={isLoading || !configFormObj.isFormValid ? "disabled" : ""} className='btn btn-primary' onClick={submitConfig}>Submit</button>
                    </div>
                </Row>


            </Validation>
            <br />
            <br />


            <h2>Deductions</h2>
            <Button className='btn-primary' onClick={handleShowAdd}>
                Add Deductions
            </Button>



            <div className='mt-5'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Particular</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount/Per</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {_deductionJsx}


                    </tbody>
                </table>
            </div>




        </Container>

    </React.Fragment>
}

export default ConfigurationComponent;