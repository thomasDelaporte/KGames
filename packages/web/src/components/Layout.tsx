import React from 'react'

export default function Layout(props: any) {
    return (
        <main className="main">
            { props.children }
        </main>
    )
}