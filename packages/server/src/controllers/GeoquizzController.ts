import { Request, Response } from 'express'
import Container from 'typedi';
import { RoomService } from '../services';

// @ts-ignore
import fetch from 'node-fetch';

export const onFlagImage = async (req: Request, res: Response) => {
    
    const { roomId } = req.params;
    const roomService = Container.get(RoomService);

    const room = roomService.getRoom(roomId);
    
    if(room == null && roomId !== 'example' )
        return res.status(500).send({ error: 'No room find with this id.' });
    
    const image = await fetch('https://flagcdn.com/fr.svg');
    const imageBuffer = await image.buffer();

    res.header('Content-Type', 'image/svg+xml');
    res.send(imageBuffer)
}