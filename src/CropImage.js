import React, { Component } from 'react';
import './App.css';

import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

class CropImage extends Component {

  constructor(props) {
    super(props);
    this.copRef = React.createRef();
  }

  state = {
    image: null
  }

  componentDidMount() {
    const image = document.querySelector('.' + this.copRef.current.className);
  const cropper = new Cropper(image, {
    aspectRatio: 12/16,
    crop(event) {
      console.log(event);
    },
    viewMode: 1,
    dragMode: 'move',
    cropBoxResizable: false,
    preview: '.app__preview-image'
  });
  }

  render() {
    return (
      <div >
        <img 
          className="app_image" 
          src="/images/01.jpg"
          alt = "demo"
          ref = {this.copRef}
        />
        <img 
          className="app__preview-image" 
        />
      </div>
    );
  }
}

export default CropImage;
