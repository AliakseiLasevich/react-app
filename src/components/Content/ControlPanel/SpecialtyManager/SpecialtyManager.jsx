import React, {useState} from "react";
import plus_green from "../../../../assets/img/plus_green.png";
import minus_red from "../../../../assets/img/minus_red.png";
import AddSpecialty from "./AddSpecialty";
import AllSpecialties from "./AllSpecialties";

const SpecialtyManager = (props) => {

    const [addSpecialty, setAddSpecialty] = useState(false);

    const toggleEditMode = () => {
        setAddSpecialty(!addSpecialty)
    };

    return (

        <div>
            <div onClick={toggleEditMode}>
                {!addSpecialty && <span><img src={plus_green} alt="+"/>Добавить Специальность</span>}
                {addSpecialty && <span><img src={minus_red} alt="-"/>Отмена</span>}
            </div>
            {addSpecialty && <AddSpecialty/>}

            <AllSpecialties/>
        </div>

    )
};

export default SpecialtyManager;