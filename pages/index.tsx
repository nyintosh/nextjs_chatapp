import axios, { AxiosError } from 'axios'
import { Context } from 'context'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import styles from 'styles/Auth.module.scss'

const Auth = () => {
	const { User, setUser } = useContext(Context)

	const [ IsLoggingIn, setLoggingIn ] = React.useState(false)
	const router = useRouter()

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => (
		setUser({ ...User, [e.target.name]: e.target.value })
	)

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setLoggingIn(true)

			const { username, secret } = User
			await axios.put('https://api.chatengine.io/users/', { username, secret }, {
				headers: { 'PRIVATE-KEY': 'dfa69e04-b1ec-4fbd-9fcb-2cb671a70d6d' },
			})

			sessionStorage.setItem('User', JSON.stringify(User))
			await router.push('/chats')
		} catch (error) {
			console.log((error as AxiosError))
		}
	}

	return (
		<section className={styles.wrapper}>
			<form className={styles.form} onSubmit={onSubmitHandler}>
				<p className={styles.form_title}>Login...</p>
				<div className={styles.input_box}>
					<input
						type='text'
						name='username'
						id='username'
						placeholder={'Username'}
						value={User.username}
						onChange={onChangeHandler}
						autoComplete={'off'}
						required={true}
					/>
				</div>
				<div className={styles.input_box}>
					<input
						type='password'
						name='secret'
						id='secret'
						placeholder={'Secret'}
						value={User.secret}
						onChange={onChangeHandler}
						autoComplete={'off'}
						required={true}
					/>
				</div>
				{IsLoggingIn ? (
					<button type='submit' disabled={true}>
						Logging in...
					</button>
				) : (
					<button type='submit'>
						Login
					</button>
				)}
			</form>
		</section>
	)
}

export default Auth
