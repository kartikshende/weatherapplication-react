import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import App from '../App';
import Forecast from './Forecast';

const Main_router = () => (

  <BrowserRouter>

    <Switch>
    <Route path="/" component={App} exact />
    <Route path="/forecast/:id" component={Forecast} />
    </Switch>

  </BrowserRouter>

);
export default Main_router;
