import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import Store from './store/store';


const store = new Store()
export const Context = React.createContext({
	store,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Context.Provider value={{
		store
	}}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Context.Provider>
);