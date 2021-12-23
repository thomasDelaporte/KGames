import React, { useEffect, useState } from 'react';

export default function Countdown() {

    const [timer, setTimer] = React.useState(3)

    useEffect(() => {

        const interval = setInterval(() => {

            setTimer((prev) => {

                if(prev <= 1)
                    clearInterval(interval);

                return prev - 1
            }) }, 1000)

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="countdown">{timer}</div>
    )
}