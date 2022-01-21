import React from 'react';

import './AnswerScattergory.style.scss';

export const AnswerScattergory = ({ response, setResponse, disabled }: { setResponse?: any, response: any, disabled: boolean }) =>  {

    const onChangeInput = (type: string, e: any) => {
        setResponse((prevResponse: {}) => ({
            ...prevResponse,
            [type]: e.target.value
        }))
    }

    return (
        <div className="kculture__answer-scattergory">
            <label className="input-group label">Animal
                <input className="input input--small" type="text" value={response.animal || ''} onChange={onChangeInput.bind(null, 'animal')} disabled={disabled} />
            </label>

            <label className="input-group label">Célébrité (nom de f.)
                <input className="input input--small" type="text" value={response.celebrity || ''} onChange={onChangeInput.bind(null, 'celebrity')} disabled={disabled}  />
            </label>

            <label className="input-group label">Pays
                <input className="input input--small" type="text" value={response.country || ''} onChange={onChangeInput.bind(null, 'country')} disabled={disabled}  />
            </label>

            <label className="input-group label">Métier
                <input className="input input--small" type="text" value={response.job || ''} onChange={onChangeInput.bind(null, 'job')} disabled={disabled}  />
            </label>

            <label className="input-group label">Fruit & légume
                <input className="input input--small" type="text" value={response.fruit || ''} onChange={onChangeInput.bind(null, 'fruit')} disabled={disabled}  />
            </label>

            <label className="input-group label">Objet
                <input className="input input--small" type="text" value={response.object || ''} onChange={onChangeInput.bind(null, 'object')} disabled={disabled}  />
            </label>

            <label className="input-group label">Sport
                <input className="input input--small" type="text" value={response.sport || ''} onChange={onChangeInput.bind(null, 'sport')} disabled={disabled}  />
            </label>
        </div>
    )
}