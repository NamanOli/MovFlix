import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers'

/* function logger(obj, next, action) */
/* logger(obj)(next)(action) where obj is destructured and dispatch and getState are taken out of it. */
// const logger=function({dispatch, getState})
// {
//     return function(next)
//     {
//         return function(action)
//         {
//             //middleware code
//             console.log('ACTION_TYPE:', action.type);
//             next(action);
//         }
//     }
// }

const logger = ({ dispatch, getState }) => (next) => (action) =>
{
    if (typeof (action) !== 'function')
        console.log('ACTION_TYPE:', action.type);
    next(action);
}

// const thunk=({dispatch, getState})=>(next)=>(action)=>
// {
//     if(typeof(action)=='function')
//     {
//         action(dispatch);
//         return;
//     }
//     next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

// console.log('Before State', store.getState());
// store.dispatch(
//     {
//         type: 'ADD_MOVIES',
//         movies: [{ name: 'Superman' }]
//     }
// );
// console.log('After State', store.getState());

// export const StoreContext = createContext();
/* Provider is a component in itself, i.e. the component which wraps the whole app component */
// class Provider extends React.Component
// {
//     render()
//     {
//         const { store } = this.props;/* using the props which it has got from the app component */
//         return <StoreContext.Provider value={store}>
//             {this.props.children}
//         </StoreContext.Provider>;
//     }
// }


// export function connect(callback)
// {
//     return function (Component)
//     {
//         class ConnectedComponent extends React.Component
//         {
//             constructor(props)
//             {
//                 super(props);
//                 this.unsubscribe=this.props.store.subscribe(() => this.forceUpdate())
//             }
//             componentWillUnmount()
//             {
//                 this.unsubscribe();
//             }
//             render()
//             {
//                 const { store } = this.props;
//                 const state = store.getState();
//                 const dataToBePassedAsProps = callback(state);
//                 return (<Component
//                     {...dataToBePassedAsProps}
//                     dispatch={store.dispatch}
//                 />);
//             }
//         }
//         class ConnectedComponentWrapper extends React.Component
//         {
//             render()
//             {
//                 return <StoreContext.Consumer>
//                     {(store) => <ConnectedComponent store={store} />}
//                 </StoreContext.Consumer>
//             }

//         }
//         return ConnectedComponentWrapper;
//     }
// }


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
