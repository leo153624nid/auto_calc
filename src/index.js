/* eslint-disable react/jsx-no-bind */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App/App'
import store from './redux/reduxStore'

const root = ReactDOM.createRoot(document.getElementById('root'))

const rerenderAll = (state) => {
    root.render(
        <React.StrictMode>
            <Router>
                <App
                    state={state}
                    changeCarusel={store.changeCarusel.bind(store)}
                    changeGrafik={store.changeGrafik.bind(store)}
                />
            </Router>
        </React.StrictMode>
    )
}

rerenderAll(store.getState())

store.subscribe(rerenderAll)
