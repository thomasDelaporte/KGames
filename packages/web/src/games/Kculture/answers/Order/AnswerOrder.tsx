import React from 'react';

import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable , horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import './AnswerOrder.style.scss';

export const AnswerOrder = ({ response, setResponse, disabled }: any) => {

    if(!Array.isArray(response))
        return null;

    const onDragEnd = ({ active, over }: any) => {

        if (active && over) {

            const mappedItems = response.map((object: any) => object.id);

            const oldIndex = mappedItems.indexOf(active.id);
            const newIndex = mappedItems.indexOf(over.id);

            const sortedItems = arrayMove(response, oldIndex, newIndex);

            setResponse(sortedItems);
        }
    }

    return (
        <DndContext {...!disabled && { onDragEnd: onDragEnd }} >
            <div className="kculture__answer-order">
                <SortableContext items={response} strategy={horizontalListSortingStrategy}>
                    {response.map((order: any, i: number) => (
                        <OrderItem order={order} index={i} key={order.id} disabled={disabled} />
                    ))}
                </SortableContext>
            </div>
        </DndContext>
    )
}

const OrderItem = ({ order, index, disabled }: { order: any, index: number, disabled: boolean }) => {

    const { attributes, listeners, transform, transition, setNodeRef } = useSortable({ id: order.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className="kculture__answer-order__item" key={index} data-index={index + 1} ref={setNodeRef} style={style} {...attributes} {...!disabled && listeners}>
            <img src={order.image} />
        </div>
    )
}