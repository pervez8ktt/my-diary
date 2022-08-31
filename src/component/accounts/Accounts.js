import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import useExpenses from "../../data/useExpenses";
import Head from "../head/Head";
import './Accounts.css'
import AddAccount from "./AddAccount";
import EditAccount from "./EditAccount";
import Expenses from "./Expenses";

const Accounts = (props) => {

    const [showAddAccount, setShowAddAccount] = useState(false);
    const [showEditAccount, setShowEditAccount] = useState(false);

    const { isLoading, getAccountList } = useExpenses();

    const [accountList, setAccountList] = useState([]);

    const [selectedExpense, setSelectedExpense] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const loadAccountList = () => {
        getAccountList((_result) => {
            console.info(_result)
            if(_result==null){
                _result = []
            }
            setAccountList(_result)
        })
    }

    const viewExpenses = (_id, e) => {
        setSelectedExpense(_id)
        
    }

    const hideExpenses = () => {
        setSelectedExpense(null)
        
    }

    const viewEditAccount = (_obj, e) => {
        setSelectedAccount(_obj)
        setShowEditAccount(true)
    }

    const hideEditAccount = () => {
        setSelectedAccount(null)
        setShowEditAccount(false)
        loadAccountList();
        
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
                                accountList!=null?
                                accountList.map((_o) => {
                                    return <tr key={_o.id}>
                                        
                                        <td>{_o.title}</td>
                                        <td>{_o.accountStatus}</td>
                                        <td>
                                            <Button onClick={viewExpenses.bind(this,_o.id)}>View</Button>
                                            <Button onClick={viewEditAccount.bind(this,_o)}>Edit</Button>
                                        </td>
                                    </tr>
                                }):<>
                                
                                <tr key="0"><td colSpan={3}>No Data</td></tr>

                                </>
                            }

                        </tbody>
                    </Table>
                </Col>
            </Row>

            <AddAccount handleClose={handleHideAddAccount} show={showAddAccount} />
            <EditAccount show={showEditAccount} handleClose={hideEditAccount} _obj={selectedAccount} />

        </Container> }

        {selectedExpense !== null && <Expenses _id={selectedExpense} closeExpenses={hideExpenses} />}

        

    </>

}

export default Accounts;