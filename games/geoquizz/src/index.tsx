import { v4 as uuidv4 } from 'uuid';
import React from 'react';

export const HelloWorld = () => {
    console.log('Hello World nonono', uuidv4());
}

export const ComponentTest = () => {
    return (
        <div>Hello World</div>
    );
}