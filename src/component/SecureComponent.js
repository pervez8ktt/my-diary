import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";


const SecureComponent = (props) => {

    return <>

        <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="configuration" element={<ConfigurationComponent />} />
            <Route path="holiday" element={<Holiday/>}/>
            <Route path="leaves" element={<LeaveLogs />}/> */}
            
        </Routes>

        

    </>

}

export default SecureComponent;