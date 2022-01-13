import { PrismaClient } from '@prisma/client';
import { ApolloError, ForbiddenError } from 'apollo-server-core';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { Player } from '../entities';
import { PlayerService } from '../services';

// @ts-ignore
import fetch from 'node-fetch';

@Service()
@Resolver(of => Player)
export class PlayerResolver {

    @Inject()
    private readonly playerService: PlayerService;

    @Inject()
    private readonly prisma: PrismaClient;

    @Query(() => Player, { nullable: true })
    me(@Ctx() context: any): Player | null {
        
        if(context.player === undefined)
            throw new ForbiddenError('No user found with your session data.');
        
        return context.player;
    }

    @Mutation(() => String)
    auth(@Arg('username') username: string): string {
        return this.playerService.authenticate(username).token;
    }

    @Mutation(() => String)
    async authTwitch(@Arg('access_token') access_token: string): Promise<string> {

        const twitchUserResponse = await fetch('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Client-ID': process.env.TWITCH_CLIENT as string
            }
        });
        
        const twitchUsers = await twitchUserResponse.json();
        const twitchUser = twitchUsers.data[0] || null;

        if(twitchUser === null)
            throw new ApolloError('No user found with the provided token.');
        
        let user = await this.prisma.user.findFirst({ 
            where: {
                twitch_token: twitchUser.id
            }
        });

        if(user === null) {
            user = await this.prisma.user.create({
                data: {
                    name: twitchUser.display_name,
                    twitch_token: twitchUser.id
                }
            });
        }

        return this.playerService.authenticateAsUser(user).token;
    }

    @Mutation(() => String)
    async authGoogle(@Arg('id_token') token: string): Promise<string> {
        
        const googleVerifyResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
        const googleVerify = await googleVerifyResponse.json();

        if(!googleVerify.sub)
            throw new ApolloError('Google verification didnt work properly.');

        let user = await this.prisma.user.findFirst({
            where: {
                google_token: googleVerify.sub
            }
        });

        if(user === null) {
            user = await this.prisma.user.create({
                data: {
                    name: googleVerify.name,
                    google_token: googleVerify.sub
                }
            })
        }

        return this.playerService.authenticateAsUser(user).token;
    }
}
