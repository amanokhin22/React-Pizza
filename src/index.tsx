import * as React from "react";
import * as ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import  App from './App';

const rootElem = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElem);

 if (rootElem) {
     {
         root.render(
             <Provider store={store}>
                 <BrowserRouter>
                     <App/>
                 </BrowserRouter>
             </Provider>
         );
     }
 }


