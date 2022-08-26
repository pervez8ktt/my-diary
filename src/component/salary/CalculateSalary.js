import { useEffect, useState } from "react";
import useDeduction from "../../data/useDeduction";
import FormInput from "../../UI/form/FormInput";
import Validation from "../../UI/validation/Validation";
import { Col, Container, Row } from "react-bootstrap";
import useCasualLeave from "../../data/useCasualLeave";
import useSalary from "../../data/useSalary";
import ValidationV2 from "../../UI/validation/ValidationV2";
import useValidation from "../../UI/validation/useValidation";

const CalculateSalary = ({
    month,
    year,
    configuration,
    leaves,
    holidays,
    setShowSalary,
    totalWorkingDay
}, props) => {

    const { getTotalLeave, set: setCasualLeave } = useCasualLeave();

    const { set: setSalary, getListByYearAndMonth: getSalaryListByYearAndMonth } = useSalary();

    const [isReady, setIsReady] = useState(false);



    var _formObject = {
        isFormValid: false,
        form: {
            totalWorkingDays: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Total working days is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Total working days be in decimal'
                }]
            }, holidays: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Holidays is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Holidays be in decimal'
                }]
            }, leaves: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Leaves is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Leaves be in decimal'
                }]
            }, attandance: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Attandace is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Attandace be in decimal'
                }]
            }, clPrevBalance: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'CL Previous Balance is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'CL Previous Balance be in decimal'
                }]
            }, clEarned: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'CL Earned is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'CL Earned be in decimal'
                }]
            }, clApplied: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'CL Applied is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'CL Applied be in decimal'
                }]
            }, clBalance: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'CL Balance is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'CL Balance be in decimal'
                }]
            }, salary: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Salary is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Salary be in decimal'
                }]
            }, salaryPerDay: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Salary Per Day is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Salary Per day be in decimal'
                }]
            }, leaveSalary: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Leave salary is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Leave salary be in decimal'
                }]
            }, pf: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'PF is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'PF be in decimal'
                }]
            }, security: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Security is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Security be in decimal'
                }]
            }, tds: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'TDS is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'TDS be in decimal'
                }]
            }, other: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Other is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Other be in decimal'
                }]
            }, salaryCalculated: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Salary Calculated is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Salary Calculated be in decimal'
                }]
            }, salaryCredited: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Salary Credited is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Salary Credited be in decimal'
                }]
            }, salaryDifference: {
                value: 0,
                isValid: true,
                vtype: [{
                    type: 'required',
                    error: 'Salary Difference is required'
                }, {
                    type: 'regNegPosNum',
                    error: 'Salary Difference be in decimal'
                }]
            }, notes: {
                value: '',
                isValid: true,
                vtype: []
            }

        }
    }


    const { formObject, formDispatcher, update } = useValidation(_formObject);




    //const [formObject, setFormObject] = useState(_formObject);


    useEffect(() => {

        if (totalWorkingDay == 0) {
            return
        }

        getSalaryListByYearAndMonth({ year, month }, (response) => {

            if (response != null) {
                responseToFormObject(response);
            } else {

                formObject.form.totalWorkingDays.value = totalWorkingDay;
                formObject.form.holidays.value = holidays;
                formObject.form.leaves.value = leaves;
                var _attandance = totalWorkingDay - leaves;
                formObject.form.attandance.value = _attandance;
                formObject.form.salary.value = configuration.salary;
                var _salaryPerDay = formObject.form.salary.value / formObject.form.totalWorkingDays.value;
                formObject.form.salaryPerDay.value = _salaryPerDay;
                formObject.form.pf.value = configuration.pf;
                formObject.form.tds.value = configuration.tds;
                formObject.form.security.value = configuration.security;
                formObject.form.other.value = configuration.other;


                if (_attandance >= configuration.attandanceReqForCl) {
                    formObject.form.clEarned.value = configuration.clPerMonth;
                }


                update(formObject);
            }
            setIsReady(true);
        })



    }, [totalWorkingDay])


    useEffect(() => {
        getTotalLeave((response) => {
            if (response != null) {
                const _cl = response.totalCl;

                if (formObject.form.clPrevBalance.value === _cl) {
                    calculateSalaryM()
                } else {


                    formObject.form.clPrevBalance.value = _cl;
                    formObject.form.clPrevBalance.isValid = true;

                    update(formObject)
                }


            }
        })
    }, [])

    useEffect(() => {

        const timeout = setTimeout(() => {
            calculateSalaryM();
        }, 500)

        return () => {
            clearTimeout(timeout);
        }

    }, [formObject.form.clPrevBalance.value, formObject.form.clEarned.value, formObject.form.clApplied.value, formObject.form.pf.value, formObject.form.tds.value, formObject.form.security.value, formObject.form.other.value, formObject.form.salary.value])

    const calculateSalaryM = () => {

        if (!isReady) {
            return;
        }

        formObject.form.salaryPerDay.value = formObject.form.salary.value / formObject.form.totalWorkingDays.value;

        const _clBalance = formObject.form.clPrevBalance.value + formObject.form.clEarned.value - formObject.form.clApplied.value
        const _leaveSalary = formObject.form.salaryPerDay.value * (formObject.form.leaves.value - formObject.form.clApplied.value)
        const _salary = formObject.form.salary.value - _leaveSalary - formObject.form.pf.value - formObject.form.tds.value - formObject.form.security.value - formObject.form.other.value


        formObject.form.clBalance.value = _clBalance;
        formObject.form.leaveSalary.value = _leaveSalary;
        formObject.form.salaryCalculated.value = _salary;

        update(formObject)

    }

    useEffect(() => {

        const timeout = setTimeout(() => {

            formObject.form.salaryDifference.value = formObject.form.salaryCalculated.value - formObject.form.salaryCredited.value;
            update(formObject)

        }, 500)

        return () => {
            clearTimeout(timeout);
        }

    }, [formObject.form.salaryCredited.value, formObject.form.salaryCalculated.value])

    const formObjectToRequestObject = () => {
        const _obj = {}

        const keys = Object.keys(formObject.form);

        for (var i = 0; i < keys.length; i++) {
            const key = keys[i];
            _obj[key] = formObject.form[key].value;
        }

        return _obj;
    }



    const responseToFormObject = (_response) => {

        const keys = Object.keys(_response);

        for (var i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (formObject.form[key]) {
                formObject.form[key].value = _response[key];
                formObject.form[key].isValid = true;
            }

        }

        update(formObject)


    }


    const onSubmit = () => {
        var _obj = formObjectToRequestObject();

        setSalary({ year, month }, _obj, () => {
            setCasualLeave({ month, year, earnedCl: formObject.form.clEarned.value, totalCl: formObject.form.clBalance.value }, () => {
                setShowSalary(false);
                setIsReady(false);
            })

        })

    }

    console.info("Refreshed")
    console.info(formObject.form)

    return <Container>
        <p>Salary of {parseInt(month) + 1} / {year}</p>
        <ValidationV2 formObjectInit={_formObject} formObject={formObject} formDispatcher={formDispatcher}>

            <FormInput label="Total working day" value={formObject.form.totalWorkingDays.value} name="totalWorkingDays" readOnly="readonly" />
            <FormInput label="Holidays" value={formObject.form.holidays.value} name="holidays" readOnly="readonly" />
            <FormInput label="Leaves" value={formObject.form.leaves.value} name="leaves" readOnly="readonly" />
            <FormInput label="Attandance" value={formObject.form.attandance.value} name="totalAttandance" readOnly="readonly" />
            <FormInput label="CL Prev Balance" value={formObject.form.clPrevBalance.value} name="clPrevBalance" type="number" />
            <FormInput label="CL Earned" value={formObject.form.clEarned.value} name="clEarned" type="number" />
            <FormInput label="CL Applied" value={formObject.form.clApplied.value} name="clApplied" type="number" />
            <FormInput label="CL Balance" value={formObject.form.clBalance.value} name="clBalance" readOnly="readonly" />
            <FormInput label="Salary" value={formObject.form.salary.value} name="salary" type="number" />
            <FormInput label="Salary per day" value={formObject.form.salaryPerDay.value} name="salaryPerDay" readOnly="readonly" />
            <FormInput label="Leave Salary" value={formObject.form.leaveSalary.value} name="leaveSalary" readOnly="readonly" />
            <FormInput label="PF" value={formObject.form.pf.value} name="pf" type="number" />
            <FormInput label="Security" value={formObject.form.security.value} name="security" type="number" />
            <FormInput label="TDS" value={formObject.form.tds.value} name="tds" type="number" />
            <FormInput label="Other" value={formObject.form.other.value} name="other" type="number" />
            <FormInput label="Salary Calculated" value={formObject.form.salaryCalculated.value} name="salaryCalculated" readOnly="readonly" />
            <FormInput label="Salary Credited" value={formObject.form.salaryCredited.value} name="salaryCredited" />
            <FormInput label="Salary Difference" value={formObject.form.salaryDifference.value} name="salaryDifference" readOnly="readonly" />
            <FormInput label="Notes" value={formObject.form.notes.value} name="notes" />
        </ValidationV2>
        <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
        <button className="btn btn-primary" onClick={(e) => { setShowSalary(false) }}>Close</button>
    </Container>
}

export default CalculateSalary;