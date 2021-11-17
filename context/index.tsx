import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface IUser {
	username: string
	secret: string
}

export const Context = createContext<{ User: IUser, setUser: Dispatch<SetStateAction<IUser>> }>(
	{
		User   : { username: '', secret: '' },
		setUser: () => {},
	},
)

export const ContextProvider = (props: any) => {
	const [ User, setUser ] = useState<IUser>({ username: '', secret: '' })

	return (
		<Context.Provider value={{ User, setUser }}>
			{props.children}
		</Context.Provider>
	)
}
