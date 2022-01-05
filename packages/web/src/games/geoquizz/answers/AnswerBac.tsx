import React from 'react';

export const AnswerBac = (props: { setResponse: any, response: any }) => (
    <div className="geoquizz__petitbac">
        <label className="input-group label">Animal<input className="input input--small" type="text" /></label>
        <label className="input-group label">Célébrité (nom de f.)<input className="input input--small" type="text" /></label>
        <label className="input-group label">Pays<input className="input input--small" type="text" /></label>
        <label className="input-group label">Métier<input className="input input--small" type="text" /></label>
        <label className="input-group label">Fruit & légume<input className="input input--small" type="text" /></label>
        <label className="input-group label">Objet<input className="input input--small" type="text" /></label>
        <label className="input-group label">Sport<input className="input input--small" type="text" /></label>
    </div>
)