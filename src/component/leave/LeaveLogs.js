import { useEffect, useState } from "react";
import useCasualLeave from "../../data/useCasualLeave";
import Head from "../head/Head";
import { Col, Row } from "react-bootstrap";
import FormSelect from "../../UI/form/FormSelect";

const LeaveLogs = (props) => {

    const _currentDate = new Date();

    const _currentYear = _currentDate.getFullYear();

    const { getTotalLeave, getListByYear } = useCasualLeave();
    //const [month, setMonth] = useState(_currentDate.getMonth());
    const [year, setYear] = useState(_currentYear);

    const [clJsx, setClJsx] = useState([]);

    useEffect(() => {
        getListByYear({ year }, (response) => {
            if (response != null) {
                const _jsxList = [];
                const keys = Object.keys(response);
                for (var i = 0; i < keys.length; i++) {
                    const _clObj = response[keys[i]];
                    const _jsx = <tr><td>{i+1}</td><td>{(parseInt(_clObj.month)+1)+" / "+_clObj.year}</td><td>{_clObj.earnedCl}</td></tr>
                    _jsxList.push(_jsx);
                }

                setClJsx(_jsxList);
            }

            //debugger;
        })
    }, [ year])

    const handleOnChange = (type, e) => {
        let value = e.target.value;
        if (type === 'year') {
            setYear(value);
        } else if (type === 'month') {
            //setMonth(value);
        }
    }

    const yearOptions = [];

    for (var i = _currentYear; i > _currentYear - 70; i--) {
        let opt = <option key={i}>{i}</option>;
        yearOptions.push(opt);
    }

    return <>
        <Head title="Leaves" />

        <Row className="px-md-4">
            {/*<Col md={6}>
                <FormSelect label={"Month"} value={month} onChange={handleOnChange.bind(this, 'month')}>
                    <option key={0} value="0">January</option>
                    <option key={1} value="1">Fabruary</option>
                    <option key={2} value="2">March</option>
                    <option key={3} value="3">April</option>
                    <option key={4} value="4">May</option>
                    <option key={5} value="5">June</option>
                    <option key={6} value="6">July</option>
                    <option key={7} value="7">August</option>
                    <option key={8} value="8">September</option>
                    <option key={9} value="9">October</option>
                    <option key={10} value="10">November</option>
                    <option key={11} value="11">December</option>

                </FormSelect>
            </Col>*/}
            <Col md={6}>
                <FormSelect label={"Year"} onChange={handleOnChange.bind(this, 'year')} value={year}>
                    {yearOptions}
                </FormSelect>

            </Col>
        </Row>

        <div className='mt-5'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Month / Year</th>
                        <th scope="col">CL Earned</th>

                    </tr>
                </thead>
                <tbody>

                    {clJsx}


                </tbody>
            </table>
        </div>

    </>

}

export default LeaveLogs;