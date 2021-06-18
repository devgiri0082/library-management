import React from 'react'

export default function Member() {
    if (localStorage.getItem("token") === null) {
        return (
            <h1>You are not authorized. Please log in first</h1>
        )
    }
    return (
        <div>
            Member
        </div>
    )
}
