import React, {Component} from "react";
import { hot } from "react-hot-loader";
import MainContainer from './client/containers/MainContainer.jsx';

class App extends Component{
  render(){
    return(
      <div className="App">
        <MainContainer />
      </div>
    );
  }
}

export default hot(module) (App); 