import React, { ChangeEvent, SyntheticEvent } from 'react';

export const AnswerBac = ({ response, setResponse }: { setResponse: any, response: any }) =>  {

    const onChangeInput = (type: string, e: any) => {
        setResponse((prevResponse: {}) => ({
            ...prevResponse,
            [type]: e.target.value
        }))
    }

    return (
        <div className="geoquizz__petitbac">
            <label className="input-group label">Animal
                <input className="input input--small" type="text" value={response.animal || ''} onChange={onChangeInput.bind(null, 'animal')} />
            </label>

            <label className="input-group label">Célébrité (nom de f.)
                <input className="input input--small" type="text" value={response.celebrity || ''} onChange={onChangeInput.bind(null, 'celebrity')} />
            </label>

            <label className="input-group label">Pays
                <input className="input input--small" type="text" value={response.country || ''} onChange={onChangeInput.bind(null, 'country')} />
            </label>

            <label className="input-group label">Métier
                <input className="input input--small" type="text" value={response.job || ''} onChange={onChangeInput.bind(null, 'job')} />
            </label>

            <label className="input-group label">Fruit & légume
                <input className="input input--small" type="text" value={response.fruit || ''} onChange={onChangeInput.bind(null, 'fruit')} />
            </label>

            <label className="input-group label">Objet
                <input className="input input--small" type="text" value={response.object || ''} onChange={onChangeInput.bind(null, 'object')} />
            </label>

            <label className="input-group label">Sport
                <input className="input input--small" type="text" value={response.sport || ''} onChange={onChangeInput.bind(null, 'sport')} />
            </label>
        </div>
    )
}