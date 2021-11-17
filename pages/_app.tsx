import { ContextProvider } from 'context'
import type { AppProps } from 'next/app'

import 'styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ContextProvider>
			<Component {...pageProps} />
		</ContextProvider>
	)
}

export default MyApp
