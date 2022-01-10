import { MockedProvider } from '@apollo/client/testing';
import { SessionProvider, GET_ME } from '../src/store/session/SessionProvider';

import '../src/styles/index.scss';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
    }
}

const mocks = [
	{
		request: {
			query: GET_ME
		},
		result: {
			data: {
				me: { username: 'mocked username', room: { id: '#' } }
			}
		}
	}
];

export const decorators = [
	(Story) => (
		<MockedProvider mocks={mocks}>
			<SessionProvider>
				<Story />
			</SessionProvider>
		</MockedProvider>
	)
]