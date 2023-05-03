import React from 'react'
import { Link } from 'react-router-dom';
const CardInfo = ({ image, name, id }) => {
    return (
        <div class="card">
            <img src={image} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">{status}</p>
                <button class="btn btn-primary">Go somewhere</button>
            </div>
        </div>
    )
}

export default CardInfo