import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Calander from "./calander/Calander";
import useConfiguration from "../data/useConfiguration";
import Head from "./head/Head"
import './Dashboard.css'

const Dashboard = (props) => {

    const { getList: getConfigList } = useConfiguration();

    const [calanderView, setCalanderView] = useState(<p>Please wait!!!</p>);

    const [showSalary, setShowSalary] = useState(false);

    const navigation = useNavigate();

    const [configuration, setConfiguration] = useState();
    const [totalWorking, setTotalworking] = useState(0);
    const [totalLeaves, setTotalLeaves] = useState(0);
    const [totalHoliday, setTotalHoliday] = useState(0);
    const [totalCl, setTotalCl] = useState(0);
    
    

    useEffect(() => {
        setCalanderView(<Calander configuration={configuration} setTotalCl={setTotalCl} setTotalworking={setTotalworking} setTotalLeaves={setTotalLeaves} setTotalHoliday={setTotalHoliday} holidays={totalHoliday} leaves={totalLeaves} totalWorkingDay={totalWorking}/>)
    }, [configuration,totalWorking,totalLeaves,totalHoliday])

    useEffect(() => {
        getConfigList((response) => {
            if (response == null) {
                navigation("configuration")
            } else {
                setConfiguration(response);


            }
        });
    }, [])
    
    return <><Container>
    <Head title="Dashboard" />

    <br />
    <Row>

        <Col className="btn btn-primary margin-1px"><p>Total Working <span>{totalWorking}</span></p></Col>
        <Col className="btn btn-primary margin-1px"><p>Total Attandance <span>{totalWorking-totalLeaves}</span></p></Col>
        <Col className="btn btn-danger margin-1px"><p>Total Leaves <span>{totalLeaves}</span></p></Col>
        <Col className="btn btn-warning margin-1px"><p>Total Holiday <span>{totalHoliday}</span></p></Col>
        <Col className="btn btn-success margin-1px"><p>Total CL <span>{totalCl}</span></p></Col>
        <Col></Col>
    </Row>

    <br />
    {calanderView}
    
    </Container>


</>
}

export default Dashboard