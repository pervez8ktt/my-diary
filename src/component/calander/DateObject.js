import { propTypes } from "react-bootstrap/esm/Image";

const DateObject = ({
    isOff,
    isHoliday,
    isFullDayLeave,
    isHalfDayLeave,
    date,
    addHoliday,
    addLeave,
    addNotes,
    notes,
    workingNotes,
    addWorking
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

    if(isHalfDayLeave){
        
        _class = "bg-secondary"
        _dText = isHalfDayLeave;
    }

    if (isOff) {
        _class = "bg-warning"
        _dText = "Off";
    }

    if(isFullDayLeave){
        _class = "bg-danger"
        _dText = isFullDayLeave;
    }

    if (isHoliday) {
        _class = "bg-warning";
        _dText = isHoliday;
    }

    

    _class = currentDateClass ? currentDateClass : _class;

    const addHolidayHandler = () => {
        addHoliday(date);
    }

    const addNotesHandler = () => {
        addNotes(date);
    }

    const addLeaveHandler = () => {
        addLeave(date);
    }

    const addWorkingHandler = () =>{
        addWorking(date);
    }

    return <>
        <td className={_class}>
            <p>{date}</p>
            <span>{_dText}</span><br/>
            {notes?<><span>{notes}</span><br/></>:<></>}
            {workingNotes?<><span>{workingNotes}</span><br/></>:<></>}
            <button type="button" className={_btnClass} onClick={addHolidayHandler}>Holiday</button><button type="button" className={_btnClass} onClick={addLeaveHandler}>Leave</button>
            <button type="button" className={_btnClass} onClick={addNotesHandler}>Notes</button>
            <button type="button" className={_btnClass} onClick={addWorkingHandler}>Add working</button>
        </td>
    </>

}

export default DateObject;