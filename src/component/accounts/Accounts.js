import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import useExpenses from "../../data/useExpenses";
import Head from "../head/Head";
import './Accounts.css'
import AddAccount from "./AddAccount";
import Expenses from "./Expenses";

const Accounts = (props) => {

    const [showAddAccount, setShowAddAccount] = useState(false);

    const { isLoading, getAccountList } = useExpenses();

    const [accountList, setAccountList] = useState([]);

    const [selectedExpense, setSelectedExpense] = useState(null);

    const loadAccountList = () => {
        getAccountList((_result) => {
            console.info(_result)
            setAccountList(_result)
        })
    }

    const viewExpenses = (_id, e) => {
        setSelectedExpense(_id)
        
    }

    const hideExpenses = () => {
        setSelectedExpense(null)
        
    }

    useEffect(() => {
        loadAccountList();
    }, [])



    const handleShowAddAccount = () => {
        setShowAddAccount(true)
    }

    const handleHideAddAccount = (_result) => {
        setShowAddAccount(false)
        loadAccountList();
    }

    return <>

        <Head title="Expenses" />

        {selectedExpense === null && <Container>

            <Row>
                <Col>
                    <Button className="float-end add-account" onClick={handleShowAddAccount}>Add New Account</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                accountList.map((_o) => {
                                    return <tr>
                                        
                                        <td>{_o.title}</td>
                                        <td>{_o.accountStatus}</td>
                                        <td><Button onClick={viewExpenses.bind(this,_o.id)}>View</Button></td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </Table>
                </Col>
            </Row>

            <AddAccount handleClose={handleHideAddAccount} show={showAddAccount} />

        </Container> }

        {selectedExpense !== null && <Expenses _id={selectedExpense} closeExpenses={hideExpenses} />}

    </>

}

export default Accounts;