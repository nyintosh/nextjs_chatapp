import { Context } from 'context'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import styles from 'styles/Chats.module.scss'

const MessageFormSocial = dynamic(() => (
	// @ts-ignore
	import('react-chat-engine').then((module) => module.MessageFormSocial)
))

const ChatEngine = dynamic(() => (
	// @ts-ignore
	import('react-chat-engine').then((module) => module.ChatEngine)
))

const Chats = () => {
	const { User: { username, secret } } = useContext(Context)

	const [ ShowChat, setShowChat ] = useState(false)
	const router = useRouter()

	useEffect(() => {
		setShowChat(typeof document !== null)
		!username && router.push('/')
	}, [ router, username ])

	if (!ShowChat) return null

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ChatEngine
					// @ts-ignore
					projectID='745ae7de-e017-4c11-a8c6-1d1ad410f103'
					userName={username}
					userSecret={secret}
					height={'calc(100vh - 40px)'}
					renderNewMessageForm={() => <MessageFormSocial />}
				/>
			</div>
		</div>
	)
}

export default Chats
