import React, {useRef, useState} from 'react';
import moment from "moment";
import Button from "react-bootstrap/Button";
import {Overlay} from "react-bootstrap";

const Cell = ({subgroup, timeIndex, lessons, day}) => {

    const isLessonThisDay = (lesson, day) => {
        const d = moment(day).format('DD-MM-YYYY');
        const dd = moment(lesson.dateTime).format('DD-MM-YYYY');
        return d === dd;
    };

    const filteredLessons = lessons.filter(lesson => isLessonThisDay(lesson, day));

    const filterLessonSubgroupsBySubgroup = (lesson, subgroup) => {
        const filtered = lesson.studentSubgroups.filter(subgr => subgr.publicId === subgroup.publicId);
        return filtered;
    };
    const [show, setShow] = useState(false);
    const target = useRef(null);


    const button = (lesson) => (
        <>
            <Button variant="info btn-sm" ref={target} onMouseOver={() => setShow(!show)}
                    onMouseOut={() => setShow(!show)}>
                {lesson.discipline.name}
            </Button>

            <Overlay target={target.current} show={show} placement="top">
                {({placement, arrowProps, show: _show, popper, ...props}) => (
                    <div
                        {...props}
                        style={{
                            backgroundColor: 'grey',
                            padding: '2px 10px',
                            color: 'white',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        <div>
                            <div>Преподаватель: {lesson.teacher.name}</div>
                            <div>Кабинет №: {lesson.cabinet.number}</div>
                        </div>

                    </div>
                )}
            </Overlay>
        </>);

    return (
        <>
            {filteredLessons.map((lesson, i) =>
                <div key={lesson+i}>
                   { lesson.order === timeIndex && filterLessonSubgroupsBySubgroup(lesson, subgroup).length > 0 &&
                    button(lesson)}
                </div>
            )}
        </>

    );
};

export default Cell;