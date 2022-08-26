import { Route, Routes } from "react-router-dom";
import ConfigurationComponent from "./configuration/ConfigurationComponent";
import Dashboard from "./Dashboard";
import Holiday from "./holiday/Holiday";
import LeaveLogs from "./leave/LeaveLogs";


const SecureComponent = (props) => {

    return <>

        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="configuration" element={<ConfigurationComponent />} />
            <Route path="holiday" element={<Holiday/>}/>
            <Route path="leaves" element={<LeaveLogs />}/>
            
        </Routes>

        

    </>

}

export default SecureComponent;