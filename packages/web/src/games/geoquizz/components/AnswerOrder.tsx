import React from 'react';

export const AnswerOrder = ({ question }: any) => {
    console.log(question);

    return (
<div className="geoquizz__orders">
        {question.items.map((order: any, i: number) => (
            <div className="geoquizz__orders__item" key={i} data-index="1">
                <img src={order} />
            </div>
        ))}
    </div>
    )
}
