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
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {useDispatch, useSelector} from "react-redux";
import {requestStudentCourses} from "../../../redux/StudentsReducer";


function Row(props) {
    const {subgroup} = props;
    const [open, setOpen] = React.useState(false);


    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{subgroup.name}</TableCell>
                <TableCell>
                    {subgroup.studentsCount}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Группы
                            </Typography>

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function StudentsGroupTable(props) {
    const subgroups = props.studentGroup?.studentSubgroups;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">

                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Подгруппа</TableCell>
                        <TableCell>Количество студентов</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {subgroups.map(subgroup => (
                        <Row subgroup={subgroup}/>
                        // <>
                        //     <TableCell/>
                        //     <TableCell>{subgroup.name} </TableCell>
                        //     <TableCell>{subgroup.studentsCount} </TableCell>
                        // </>
                    ))}

                </TableBody>

            </Table>
        </TableContainer>
    );
}