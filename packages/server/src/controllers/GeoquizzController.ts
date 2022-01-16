import { Request, Response } from 'express'
import Container from 'typedi';
import { RoomService } from '../services';

// @ts-ignore
import fetch from 'node-fetch';
import { Geoquizz } from '../games/Geoquizz';

export const onFlagImage = async (req: Request, res: Response) => {
    
    const { roomId } = req.params;
    const roomService = Container.get(RoomService);

    const room = roomService.getRoom(roomId);
    
    if(room == null && roomId !== 'example' )
        return res.status(500).send({ error: 'No room find with this id.' });

    if(!(room?.currentGame instanceof Geoquizz))
        return res.status(500).send({ error: 'Not playing the Geoquizz game mode.' });

    const game: Geoquizz = room.currentGame;
    const flag = game.getCurrentFlag();

    if(flag === false)
        return res.status(500).send({ error: 'No flag found.' });

    const image = await fetch(flag);
    const imageBuffer = await image.buffer();

    res.header('Content-Type', 'image/svg+xml');
    res.send(imageBuffer);
}