import { useState } from "react";
import { Button, Col, Container, Row, Stack, Table } from "react-bootstrap";
import useExpenses, { ExpensesType } from "../../data/useExpenses";
import AddExpenses from "./AddExpenses";
import moment from 'moment';
import './Expenses.css'

const Expenses = ({ _id, closeExpenses }) => {

    const [showAddExpense, setShowAddExpense] = useState(false);

    const { isLoading, getExpenses, deleteExpense } = useExpenses();

    const [expenseList, setExpenseList] = useState([]);

    const [totalExpense, setTotalExpense] = useState(0)

    const loadExpense = () => {
        if (_id != null) {
            getExpenses({ accountIndex: _id }, (result) => {
                let _expenseList = [];
                let _totalExpense = 0;
                for(let i=result.length-1; i>=0; i--){
                    let _o = result[i];

                    let _d  = moment(_o.date).format("MMM Do YY"); 

                    let _jsx = <tr>
                        <td>{_d }</td>
                        <td>{_o.perticular}</td>
                        <td>{_o.type}</td>
                        <td>{_o.amount}</td>
                        <td><Button onClick={deleteExpenese.bind(this,_o.id)}>Delete</Button></td>
                    </tr>
                    _expenseList.push(_jsx)

                    if(_o.type===ExpensesType.Minus){
                        _totalExpense-= _o.amount
                    }else{
                        _totalExpense+= _o.amount
                    }

                }

                setTotalExpense(_totalExpense)


                setExpenseList(_expenseList)
            })
        }
    }

    useState(() => {
        loadExpense()
    }, [_id])

    const handleShowAddExpense = () => {
        setShowAddExpense(true)
    }

    const handleHideAddExpense = () => {
        setShowAddExpense(false)
        loadExpense()
    }

    
    const deleteExpenese = (_expenseId, e) => {
        deleteExpense({accountIndex: _id, expenseIndex: _expenseId},(_result)=>{
            loadExpense()
        })
    }

    return <Container>

        <Row>
            <Col>
                <p>Total <span>{totalExpense}</span> </p>
            </Col>
            <Col>
                <Stack className="float-end add-account" gap={2} direction="horizontal">
                    <Button onClick={handleShowAddExpense}>Add Expenses</Button>
                    <Button className="btn btn-danger" onClick={closeExpenses}>Close Expenses</Button>

                </Stack>
            </Col>
        </Row>
        <Row className="table-container">
            <Col>
                <Table>
                    <thead>
                        <tr>
                            <th className="date">Date</th>
                            <th className="perticular">perticular</th>
                            <th>Operation</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {expenseList}



                    </tbody>
                </Table>
            </Col>
        </Row>
        <AddExpenses handleClose={handleHideAddExpense} show={showAddExpense} accountIndex={_id} />
        {/* <AddAccount handleClose={handleHideAddAccount} show={showAddAccount} /> */}

    </Container>
}

export default Expenses;