import React from "react";
import "./Square.css"

const Square = ({value, onClick }) => (
    <button class="square" onClick={onClick}>
        {value}
    </button>
);

export default Square;