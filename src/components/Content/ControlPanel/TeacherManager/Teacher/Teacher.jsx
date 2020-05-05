import React from 'react';

const Teacher = (props) => {

    return (

        <div>
            {props.id}.
            {props.name},
            {props.cathedra}
        </div>
    )
}

export default Teacher