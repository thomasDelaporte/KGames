import { AuthChecker } from 'type-graphql';

export const AuthorizationDerective: AuthChecker<any> = ({ context }) => {

	if(context.player === undefined)
		return false;

	return true;
};