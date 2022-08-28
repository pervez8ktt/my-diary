import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useCasualLeave from "../../data/useCasualLeave";
import useConfiguration from "../../data/useConfiguration";
import useHoliday from "../../data/useHoliday";
import useLeave from "../../data/useLeave";
import useMarkWorking from "../../data/useMarkWorking";
import useNotes from "../../data/useNotes";
import FormSelect from "../../UI/form/FormSelect";
import Holiday from "../holiday/Holiday";
import Leave from "../leave/Leave";
import MarkWorking from "../markWorking/MarkWorking";
import Notes from "../notes/Notes";
import CalculateSalary from "../salary/CalculateSalary";
import DateObject from "./DateObject";
import './Calander.css'

const Calander = (props) => {

    const configuration = props.configuration;
    const setTotalLeaves = props.setTotalLeaves;
    const setTotalHoliday = props.setTotalHoliday;
    const setTotalCl = props.setTotalCl;
    const setCompOff = props.setCompOff;

    const [showSalary, setShowSalary] = useState(false);

    const { getListByYearAndMonth } = useHoliday();
    const { getListByYearAndMonth: getLeaveListByYearAndMonth } = useLeave();

    const { getListByYearAndMonth: getNotes } = useNotes();
    const { getListByYearAndMonth: getMarkWorkingList } = useMarkWorking();

    const [notesList, setNotesList] = useState([]);
    const [markWrokingList, setMarkWorkingList] = useState([]);

    const _currentDate = new Date();

    const _currentYear = _currentDate.getFullYear();
    const [month, setMonth] = useState(_currentDate.getMonth());
    const [year, setYear] = useState(_currentYear);
    const [date, setDate] = useState(_currentDate.getDate());
    //    const [totalWorking, setTotalworking] = useState(0);

    useEffect(() => {
        getNotes((response) => {
            if (response != null) {
                setNotesList(response);
            }
        })
    }, [month, year])

    const { getTotalLeave } = useCasualLeave();

    useEffect(() => {
        getTotalLeave((response) => {
            setTotalCl(response.totalCl);
        })
    }, [month, year])

    useEffect(() => {
        getMarkWorkingList((response) => {
            if (response != null) {
                setMarkWorkingList(response);
            }
        })
    }, [month, year])

    _currentDate.setDate(1)

    const [holidayList, setHolidayList] = useState();

    const [leaveList, setLeaveList] = useState();
    const [holidayTitle, setHolidayTitle] = useState('');

    const [dayRowsS, setDayRowsS] = useState([])

    useEffect(() => {
        updateHolidayHandler();
        updateLeaveHandler();
        updateNotesHandler();
        updateWorkingHandler();
    }, [month, year])

    const addHolidayShowState = useState(false);

    const [, showHolidayModal] = addHolidayShowState;

    const addNotesShowState = useState(false);

    const [, showNotesModal] = addNotesShowState;

    const addWorkingShowState = useState(false);

    const [, showWorkingModal] = addWorkingShowState;


    const addLeaveShowState = useState(false);

    const [, showLeaveModal] = addLeaveShowState;

    const addHoliday = ((_date) => {
        showHolidayModal(true);
        setDate(_date)

    })

    const addLeave = ((_date) => {
        showLeaveModal(true);
        setDate(_date)

    })

    const addNotes = ((_date) => {
        showNotesModal(true);
        setDate(_date)

    })
    const addWorking = ((_date) => {
        showWorkingModal(true);
        setDate(_date)

    })



    useEffect(() => {
        var dayRows = []
        const currentDate = new Date(year, month, 1);
        const day = currentDate.getDay();

        const _leaveObj = {
            _totalLeaves: 0,
            _totalHoliday: 0,
            _totalWeekOffs: 0,
            _totalDays: 0,
            _totalCompOffs: 0

        }


        var d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInAMonth = d.getDate();

        var dt = 1;

        /*
            Immediately invoked function expression:
            
            (_functionDef)()
    
            Ques: https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
    
            Ans: https://stackoverflow.com/a/44320193
        
        */

        var dayRows = [<tr key={'tr-' + dt}>
            {(() => {
                let cols = [];

                for (let i = 0; i < 7; i++) {
                    if (i < day) {
                        cols.push(<td key={'b-' + i} ></td>);
                    } else {

                        setDateObject(i, dt, cols, _leaveObj);

                        dt++
                    }

                }
                return cols;
            })()}
        </tr>];

        while (dt <= daysInAMonth) {
            let trComp = <tr key={'tr-' + dt}>
                {(() => {
                    let cols = [];

                    for (let i = 0; i < 7; i++) {

                        if (dt > daysInAMonth) {
                            cols.push(<td key={'e-' + i} ></td>);
                        } else {
                            setDateObject(i, dt, cols, _leaveObj);
                            dt++
                        }


                    }
                    return cols;
                })()}
            </tr>

            dayRows.push(trComp);

        }

        setDayRowsS(dayRows);
        const _totalWorking = daysInAMonth - _leaveObj._totalWeekOffs - _leaveObj._totalHoliday
        props.setTotalworking(_totalWorking);
        setTotalLeaves(_leaveObj._totalLeaves);
        setTotalHoliday(_leaveObj._totalHoliday)
        setCompOff(_leaveObj._totalCompOffs)

    }, [configuration, holidayList, leaveList, year, month, notesList, markWrokingList])


    const setDateObject = (_weekDay, dt, cols, _leaveObj) => {



        var _totalLeaves = _leaveObj._totalLeaves;
        var _totalHoliday = _leaveObj._totalHoliday;
        var _totalWeekOffs = _leaveObj._totalWeekOffs;
        var _totalDays = _leaveObj._totalDays;
        var _totalCompOffs = _leaveObj._totalCompOffs;


        const _obj = {
            year: year,
            month: month,
            isOff: false,
            isHoliday: false,
            isHolidayHalf: false,
            isFullDayLeave: false,
            isHalfDayLeave: false,
            isWorking: true,
            date: dt,
            isMarkWorking: false,
            isMarkWorkingHaldDay: false,
            addHoliday: addHoliday,
            addNotes,
            addLeave,
            addWorking
        }

        if (notesList) {
            if (notesList[dt]) {
                _obj.notes = notesList[dt].title
            }
        }

        isOff(_weekDay, dt, _obj);

        if (_obj.isMarkWorking) {
            if (_obj.isMarkWorkingHaldDay) {
                _totalCompOffs += 0.5
            } else {
                _totalCompOffs += 1
            }

        }

        if (_obj.isWorking) {
            if (_obj.isHalfDayLeave) {
                _totalDays += 0.5;
                _totalLeaves += 0.5
            } else if (_obj.isHolidayHalf) {
                _totalDays += 0.5;

            } else {
                _totalDays++;
            }

        } else {
            if (_obj.isFullDayLeave) {
                _totalLeaves += 1
            } else if (_obj.isHoliday) {
                _totalHoliday += 1;
            } else if (_obj.isOff) {
                _totalWeekOffs += 1;
            }
        }

        cols.push(<DateObject key={dt + "-" + _weekDay} {..._obj} />);


        _leaveObj._totalLeaves = _totalLeaves;
        _leaveObj._totalHoliday = _totalHoliday;
        _leaveObj._totalWeekOffs = _totalWeekOffs;
        _leaveObj._totalDays = _totalDays;
        _leaveObj._totalCompOffs = _totalCompOffs

    }


    const isOff = (_weekDay, dt, _obj) => {

        if (configuration == null) {
            return;
        }

        if (holidayList) {
            let _h = holidayList[dt]
            if (_h) {
                _obj.isHoliday = _h.title


                if (_h.leaveType === 'Half-day') {
                    _obj.isHolidayHalf = true;
                    _obj.isWorking = true;
                } else {
                    _obj.isWorking = false;
                }
            } else {


                _obj.isHoliday = false

            }
        }

        if (leaveList) {


            let _h = leaveList[dt]
            if (_h) {
                if (_h.leaveType === 'Full-day') {
                    _obj.isFullDayLeave = _h.title
                    _obj.isWorking = false
                } else if (_h.leaveType === 'Half-day') {
                    _obj.isHalfDayLeave = _h.title
                }

            }
        }

        var isMarkWorking = false;

        if (markWrokingList) {
            var _mw = markWrokingList[dt];
            if (_mw) {
                isMarkWorking = true
                _obj.workingNotes = _mw.title;
                if (_mw.leaveType === 'Full-day') {

                    //_obj.isWorking = true;
                    _obj.isMarkWorking = true;



                } else if (_mw.leaveType === 'Half-day') {

                    //_obj.isWorking = true;
                    _obj.isMarkWorking = true;
                    _obj.isMarkWorkingHaldDay = true;


                }
            }

        }


        const saturdayOff = configuration.saturdayOff;
        if (_weekDay === 0) {
            _obj.isOff = true;
            _obj.isWorking = false
            return
        } else {
            _obj.isOff = false;
        }

        if (_weekDay === 6) {

            const weekIndex = Math.ceil((dt - 1 - _weekDay) / 7)

            if (saturdayOff === 1) {
                _obj.isOff = true;
                _obj.isWorking = false
                return

            } else if (saturdayOff === 2) {
                if (weekIndex === 1 || weekIndex === 3) {
                    _obj.isOff = true;
                    _obj.isWorking = false
                    return
                } else {
                    _obj.isOff = false;
                    return
                }

            } else {
                _obj.isOff = false;
                return

            }
        }









    }

    const handleOnChange = (type, e) => {
        let value = e.target.value;
        if (type === 'year') {
            setYear(value);
        } else if (type === 'month') {
            setMonth(value);
        }
    }

    const yearOptions = [];

    for (var i = _currentYear; i > _currentYear - 70; i--) {
        let opt = <option key={i}>{i}</option>;
        yearOptions.push(opt);
    }



    const updateHolidayHandler = () => {
        getListByYearAndMonth({ year: year, month: month }, (_holidayList) => {
            setHolidayList(_holidayList);
        })
    }

    const updateNotesHandler = () => {
        getNotes({ year: year, month: month }, (_notesList) => {
            setNotesList(_notesList);
        })
    }



    const updateLeaveHandler = () => {
        getLeaveListByYearAndMonth({ year: year, month: month }, (_leaveList) => {
            setLeaveList(_leaveList);
        })
    }

    const updateWorkingHandler = () => {
        getMarkWorkingList({ year: year, month: month }, (_leaveList) => {
            setMarkWorkingList(_leaveList);
        })
    }




    console.info(props)
    return <>
        {!showSalary ? <button className="btn btn-primary" onClick={(e) => { setShowSalary(true) }}>Calculate Salary</button> : ''}
        {showSalary ? <CalculateSalary month={month} year={year} configuration={configuration} holidays={props.holidays} leaves={props.leaves} totalWorkingDay={props.totalWorkingDay} setShowSalary={setShowSalary} compOff={props.compOff} />
            :
            <>

                <Holiday addShowState={addHolidayShowState} date={date} month={month} year={year} updateHolidayHandler={updateHolidayHandler} />
                <Leave addShowState={addLeaveShowState} date={date} month={month} year={year} updateHolidayHandler={updateLeaveHandler} />
                <Notes addShowState={addNotesShowState} date={date} month={month} year={year} updateNotesHandler={updateNotesHandler} />
                <MarkWorking addShowState={addWorkingShowState} date={date} month={month} year={year} updateHolidayHandler={updateWorkingHandler} />

                <Row className="px-md-4">
                    <Col md={6}>
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
                    </Col>
                    <Col md={6}>
                        <FormSelect label={"Year"} onChange={handleOnChange.bind(this, 'year')} value={year}>
                            {yearOptions}
                        </FormSelect>

                    </Col>
                </Row>
                <br />
                <Row className="calander-container">
                    <Col>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th className={"table-head"} scope="col">Sun</th>
                                    <th className={"table-head"} scope="col">Mon</th>
                                    <th className={"table-head"} scope="col">Tue</th>
                                    <th className={"table-head"} scope="col">Wed</th>
                                    <th className={"table-head"} scope="col">Thr</th>
                                    <th className={"table-head"} scope="col">Fri</th>
                                    <th className={"table-head"} scope="col">Sat</th>
                                </tr>
                            </thead>
                            <tbody>

                                {dayRowsS}

                            </tbody>
                        </table>
                    </Col>

                </Row>
                <p className="px-md-2">Legends</p>
                <Row className="px-md-4">
                    <Col md={2} className=" bg-danger d-flex justify-content-center align-items-center">
                        <p >Full Day Leave</p>

                    </Col>
                    <Col md={2} className="px-md-2 bg-secondary d-flex justify-content-center align-items-center">
                        <p >Half Day Leave</p>

                    </Col>
                    <Col md={2} className="px-md-2 bg-warning d-flex justify-content-center align-items-center">
                        <p>Holiday</p>
                    </Col>
                </Row>


            </>}
    </>
}



export default Calander;