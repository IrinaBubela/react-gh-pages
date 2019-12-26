import React from "react";

function Form(props) {
    return (
        <form onSubmit={props.weatherMethod}>
            <input type="text" name="city" placeholder="Enter you city" />
            <button>Get a forecast</button>
        </form>
    )
}
export default Form;