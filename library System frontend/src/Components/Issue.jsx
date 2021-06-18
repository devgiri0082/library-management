import React from 'react'

export default function Issue() {
    if (localStorage.getItem("token") === null) {
        return (
            <h1>You are not authorized. Please log in first</h1>
        )
    }
    return (
        <div>
            <h2>Issue</h2>
        </div>
    )
}
