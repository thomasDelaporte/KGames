import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import Container from 'typedi';
import { PlayerService } from '../services';

// @ts-ignore
import fetch from 'node-fetch';

export const onAuthenticateTwitch = async (req: Request, res: Response) => {

    const { code } = req.query;

    const prisma = Container.get(PrismaClient);
    const playerService = Container.get(PlayerService);

    const twitchTokenURL = new URL('https://id.twitch.tv/oauth2/token');
    twitchTokenURL.searchParams.append('client_id', process.env.TWITCH_CLIENT as string);
    twitchTokenURL.searchParams.append('client_secret', process.env.TWITCH_SECRET as string);
    twitchTokenURL.searchParams.append('code', code as string);
    twitchTokenURL.searchParams.append('grant_type', 'authorization_code');
    twitchTokenURL.searchParams.append('redirect_uri', 'http://localhost:4000/auth/twitch/');

    const twitchTokenResponse = await fetch(twitchTokenURL.href, { method: 'POST' });
    const twitchToken = await twitchTokenResponse.json();

    const twitchUserResponse = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            'Authorization': `Bearer ${twitchToken.access_token}`,
            'Client-ID': process.env.TWITCH_CLIENT as string
        }
    });
    
    const twitchUsers = await twitchUserResponse.json();
    const twitchUser = twitchUsers.data[0] || null;

    if(twitchUser === null)
        return res.send('error');
    
    const user = await prisma.user.findFirst({ 
        where: {
            twitch_token: twitchUser.id
        }
    });

    if(user === null) {
        const user = await prisma.user.create({
            data: {
                name: twitchUser.display_name,
                twitch_token: twitchUser.id
            }
        });
    }

    res.cookie('cookie-token', 'ICI LE MONDE');
    res.set('x-token', 'HELLO WORLD');
    return res.redirect(process.env.WEB as string);
}

export const onAuthenticateGoogle = () => {
    throw new Error('Not implemented method.');
}