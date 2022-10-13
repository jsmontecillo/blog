import {useState} from 'react';

const Header = (props) => {
    return (
        <div className="header">
            <img src={props.image} alt="header" />
            <h1>{props.title}</h1>
        </div>
    )
}

export default Header;