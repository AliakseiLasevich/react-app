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
import StudentsGroupRow from "./StudentsGroupRow";
import {useDispatch, useSelector} from "react-redux";
import {requestStudentCourses} from "../../../redux/StudentsReducer";
import StudentsGroupForm from "./StudentsGroupForm";

function Row(props) {
    const {course} = props;
    const [open, setOpen] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);

    return (
        <React.Fragment >
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
            <TableRow >
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6} align={"center"}   >
                    <Collapse in={open} timeout="auto" unmountOnExit  >
                        <Box margin={1}>
                            <button className="btn btn-sm btn-success m-1" onClick={()=>setEditMode(!editMode)}>
                                {editMode? "Отмена": "Добавить группу студентов"}
                            </button>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table" >
                                    <TableBody >
                                        {course.studentGroups.map(studentGroup => (
                                            <React.Fragment key={studentGroup.publicId}>
                                                <StudentsGroupRow studentGroup={studentGroup}/>
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Collapse>

                    {editMode &&
                    <StudentsGroupForm editMode={editMode}
                                   setEditMode={setEditMode}
                                       course={course}
                                   // specialty={specialtyToEdit}
                                   // setSpecialtyToEdit={setSpecialtyToEdit}
                    />}
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function StudentsCoursesTable() {
    const dispatch = useDispatch();
    const allCourses = useSelector(state => state.studentsReducer.allStudentCourses);

    useEffect(() => {
        dispatch(requestStudentCourses());
    }, []);

    return (
        <TableContainer component={Paper} style={{maxWidth: "750px"}}  >
            <Table aria-label="collapsible table" size="small" aria-label="a dense table" >

                <TableHead>
                    <TableRow >
                        <TableCell align="center" className="bg-warning"/>
                        <TableCell align="center" className="bg-warning">Курс</TableCell>
                        <TableCell align="center" className="bg-warning">Специализация</TableCell>
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