import "./index.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

const App = () => {
  const [lat, setLat] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => setLat(position.coords.latitude),
      err => setErrMsg(err.message)
    );
  }, []);

  let content;
  if (errMsg) {
    content = <div>Error: {errMsg}</div>;
  } else if (lat) {
    content = <SeasonDisplay latitude={lat} />;
  } else {
    content = <Spinner message="please accept location request" />;
  }

  return <div className="border red">{content}</div>;
};

// class App extends React.Component {
//   state = {
//     lat: null,
//     errMsg: ""
//   };
//   componentDidMount() {
//     // is called when the component is created
//     console.log("My Component was rendered to the screen");
//     window.navigator.geolocation.getCurrentPosition(
//       position => this.setState({ lat: position.coords.latitude }),
//       err => this.setState({ errMsg: err.message })
//     );
//   }

//   renderContent() {
//     if (this.state.errMsg && !this.state.lat) {
//       return <div>Error: {this.state.errMsg}</div>;
//     } else if (!this.state.errMsg && this.state.lat) {
//       return <SeasonDisplay latitude={this.state.lat} />;
//     } else {
//       return (
//         <div>
//           <Spinner message="Please Accept Location Request" />
//         </div>
//       );
//     }
//   }
//   render() {
//     return <div>{this.renderContent()}</div>;
//   }
// }

ReactDOM.render(<App />, document.querySelector("#root"));
