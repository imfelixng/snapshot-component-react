import React, { Component } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
class App extends Component {

  constructor(props) {
    super(props);
    this.copRef = React.createRef();
  }

  state = {
    image: null
  }

  onSnapshot = () => {
    html2canvas(
      document.querySelector("." + this.copRef.current.className), 
      {
        useCORS: true,
        logging: false
      }).then((canvas) => {
        let uri = canvas.toDataURL('image/png');
        this.setState({
          image: uri
        });
    });
  }


  render() {
    return (
      <div className="App" ref = {this.copRef}>
        <header className="App-header">
          <img
            src = "/images/01.jpg"
            alt = "demo"
            crossOrigin ="Anonymous"
          />
        </header>
        <button onClick = {this.onSnapshot}>Snapshot</button>
        {
          this.state.image && 
          <React.Fragment>
            <h1>Snapshot Image</h1>
            <img 
              src = {this.state.image}
              alt = "snapshot component"
            />
          </React.Fragment>

        }
      </div>
    );
  }
}

export default App;
