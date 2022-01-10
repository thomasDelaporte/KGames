import https from 'https';
import querystring from 'querystring';

import { query, Request, Response } from 'express';

export const onAuthenticateTwitch = async (req: Request, res: Response) => {

    const { code } = req.query;

    const twitchTokenOptions = {
        method: 'POST',
        host: 'id.twitch.tv',
        path: '/oauth2/token?' + querystring.stringify({ 
            client_id: process.env.TWITCH_CLIENT,
            client_secret: process.env.TWITCH_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:4000/auth/twitch/'
        })
    }

    const request = https.request(twitchTokenOptions, (response) => {

        let all_chunks: any = [];

        // gather chunks
        response.on('data', (chunk) => {
            all_chunks.push(chunk);
        });

        // no more data to come
        // combine all chunks to a buffer
        response.on('end', () => {
            let response_body = Buffer.concat(all_chunks);
            
            // response body as string
            console.log(response_body.toString());

            // read the response body now
        });

        // handle error while getting response
        response.on('error', (error) => {
            console.log(error.message);
        });
    });

    request.on('error', (error) => {
        console.log(error.message);
    });
    
    request.end();
    
    return res.redirect(process.env.WEB as string);
}

export const onAuthenticateGoogle = () => {
    throw new Error('Not implemented method.');
}