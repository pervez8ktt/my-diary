import { propTypes } from "react-bootstrap/esm/Image";

const DateObject = ({
    date
    
}) => {

    var _d = new Date();

    var _class = "";
    var _btnClass = "btn btn-link";

    var _dText = "";
    var currentDateClass;
    if (date === _d.getDate()) {
        currentDateClass = "bg-primary"
        _btnClass="btn btn-dark"

    }

    

    _class = currentDateClass ? currentDateClass : _class;

    
    return <>
        <td className={_class}>
            <p>{date}</p>
            
        </td>
    </>

}

export default DateObject;