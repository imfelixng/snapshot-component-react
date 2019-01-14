import React, { Component } from 'react';
import './App.css';

import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import html2canvas from 'html2canvas';

class CropImageReact extends Component {

  constructor(props) {
    super(props);
    this.cropRef = React.createRef();
    this.snapRef = React.createRef();
  }

  state = {
    image: null,
    name: "",
    snapshot: null,
    isCropped: false
  }

  _crop= () => {
    this.setState({
        image: this.cropRef.current.getCroppedCanvas().toDataURL()
    })
  }

  onChange = (e) => {
      let target = e.target;
      let value = target.value;
      let name = target.name;
      this.setState({
          [name]: value
      })
  }

  onSnapshot = (e) => {
    e.preventDefault();
    this.setState({
      isCropped: true
    }, () => {
      html2canvas(
        document.querySelector("." + this.snapRef.current.className), 
        {
          logging: false,
  
        }).then((canvas) => {
          let uri = canvas.toDataURL('image/png');
          this.setState({
            snapshot: uri
          });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
          <form onSubmit = {this.onSnapshot}>
              <input 
                type = "text"
                value = {this.state.value}
                name = "name"
                onChange = {this.onChange}
              />
              <button >Snapshot</button>
          </form>
        <Cropper
            ref= {this.cropRef}
            src='/images/01.jpg'
            style={{height: 400, width: '50%', margin: "0 auto"}}
            aspectRatio={857 / 1280}
            guides={false}
            crop={this._crop}
            viewMode = {1}
            preview=".img-preview"
            dragMode = "move"
            cropBoxResizable = {false}
            responsive = {false}
        />
        {
          !this.state.isCropped &&
          <div className = "app__img-preview" >
              <div className="img-preview" style={{ width: '100%', height: '100%', margin: 50 }} >
              </div>
            <h3>{this.state.name}</h3>
          </div>
        }
        {
          this.state.isCropped &&
          <div className = "app__img-cropped" ref = {this.snapRef} >
            <img 
                alt = "demo"
                src = {this.state.image}

                className = "app__img-cropped-aaa"
              />
            <h3>{this.state.name}</h3>
          </div>
        }
        {
          this.state.snapshot && 
          <div className = "app__img-snapshot">
              <img 
                alt = "demo"
                src = {this.state.snapshot}
              />
          </div>
        }

      </React.Fragment>
    );
  }
}

export default CropImageReact;
