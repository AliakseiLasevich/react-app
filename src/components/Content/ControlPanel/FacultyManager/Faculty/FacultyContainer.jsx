import React from "react";
import Faculty from "./Faculty";

class FacultyContainer extends React.Component {

    state = {
        editMode: false
    };

    render() {
        return (
            <div>
                <Faculty/>
            </div>
        );
    }

}

export default FacultyContainer;