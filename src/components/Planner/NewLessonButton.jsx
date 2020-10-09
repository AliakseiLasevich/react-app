import React, {useRef, useState} from 'react';
import Button from "react-bootstrap/Button";
import {Overlay} from "react-bootstrap";
import LessonForm from "./LessonForm";

const NewLessonButton = ({difference, type, name}) => {

    const [show, setShow] = useState(false);
    const [lessonToAdd, setLessonToAdd] = useState(false);
    const target = useRef(null);


    return (
        <>
            <Button variant="warning btn-sm m-1" ref={target}
                    onMouseOver={() => setShow(!show)}
                    onMouseOut={() => setShow(!show)}
                    onClick={() => setLessonToAdd(true)}>
                {name}-{type}
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
                            Не распределены {difference} занятий для подгрупп.
                        </div>

                    </div>
                )}
            </Overlay>

            {lessonToAdd && <LessonForm setLessonToAdd={setLessonToAdd}/>}
        </>)

};

export default NewLessonButton;