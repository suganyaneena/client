import React from "react";
import "../App.css"
import {MdClose} from "react-icons/md";
const Formtable = ({handleSubmit, handleOnChange, handleclose, rest}) => {

    return (

        <div className="addContainer">
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={()=>handleclose(false)}><MdClose></MdClose></div>
                {/* <div className="close-btn" onClick={handleclose}><MdClose></MdClose></div> */}

                <labl htmFor="name">Name: </labl>
                <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}></input>

                <labl htmFor="emial">Email: </labl>
                <input type="email" id="email" name="email" onChange={handleOnChange}  value={rest.email}></input>

                <labl htmFor="mobile">Mobile: </labl>
                <input type="number" id="mobile" name="mobile" onChange={handleOnChange}  value={rest.mobile}></input>
                <button className="btn">Submit</button>

            </form>
          </div>
    )
}

export default Formtable