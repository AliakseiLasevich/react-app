import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StudentsGroupTable from "./StudentsGroupTable";
import {useDispatch, useSelector} from "react-redux";
import {requestStudentCourses} from "../../../redux/StudentsReducer";


function Row(props) {
    const {course} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{course.courseNumber}</TableCell>
                <TableCell>
                    {course.specialty.name}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>

                            <button className="btn btn-sm btn-success m-1">Добавить группу студентов</button>

                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">

                                    <TableHead>
                                        <TableRow>
                                            <TableCell/>
                                            <TableCell>Подгруппа</TableCell>
                                            <TableCell>Количество студентов</TableCell>
                                        </TableRow>
                                    </TableHead>


                                    {course.studentGroups.map(studentGroup => (
                                        <>
                                            Группа: {studentGroup.number + 1}
                                            <StudentsGroupTable studentGroup={studentGroup}/>
                                        </>
                                    ))}

                                </Table>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function StudentsTable() {

    const dispatch = useDispatch();
    const allCourses = useSelector(state => state.studentsReducer.allStudentCourses);

    useEffect(() => {
        dispatch(requestStudentCourses());
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">

                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Курс</TableCell>
                        <TableCell align="right">Специализация</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {allCourses.map((course) => (
                        <Row key={course.publicId} course={course}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}