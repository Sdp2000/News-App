import React from 'react'
import loading from './loading.gif'


export default function Spinner() {
    return (
        <div>
            <div className="text-center my-3">
                <img src={loading} alt="loading" />
            </div>
        </div>
    )
}



