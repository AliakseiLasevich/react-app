import React from 'react';

const Temp = () => {
    return (

        <table>

            <tr>
                <td rowSpan="6">Hours</td>
                <td>a</td>
                <td>b</td>
                <td>c</td>
                <td>d</td>
                <td>e</td>
            </tr>
            <tr>
                <td>f</td>
                <td>g</td>
                <td>h</td>
                <td>i</td>
                <td rowSpan="2">j</td>
            </tr>
            <tr>
                <td>k</td>
                <td>l</td>
                <td>m</td>
                <td>n</td>
            </tr>
        </table>
    );
};

export default Temp;