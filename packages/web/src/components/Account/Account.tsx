import React, { useContext } from 'react';
import { SessionContext } from '../../store';

import './Account.style.scss';

export default function Account() {

    const { user } = useContext(SessionContext);

    return (
        <div className="account">
            <img className="account__thumbnail" src={`https://avatars.dicebear.com/api/adventurer-neutral/${user.me.username}.svg`} />
            <span className="account__username">{user.me.username}</span>
        </div>
    )
}