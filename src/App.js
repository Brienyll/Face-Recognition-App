import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '1c198088de08489eb8b33107e8d9d9c8'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}
class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }
  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
      app.models.predict(
        Clarifai.DEMOGRAPHICS_MODEL, 
        this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].data.face.age_appearance.concepts)
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOptions}
            />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
