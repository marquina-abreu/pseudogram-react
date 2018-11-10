import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

import FileUpload from "./FileUpload";

class App extends Component {

  constructor(){
    super();

    this.state= { //definir el stado de nuestra aplicación
      user:null
    }
    //esto hacer para todas las funciones q usan this
    this.handleAuth= this.handleAuth.bind(this);
    this.handleLogout= this.handleLogout.bind(this);
  }

  componentWillMount(){ //esto viene siendo como el ngOnInit de angular.. se dispara cuando este componente es renderizado
    
    firebase.auth().onAuthStateChanged(user=>{ //traerme la info del logeado.. de one
      this.setState({ //con setState.. modifico el state..
        user: user
      });

    })

  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider(); 

    firebase.auth().signInWithPopup(provider) //esto devuelve una promesa
      .then(result => {
        console.log(`${result.user.email} ha iniciado sesión`)
      })
      .catch(error => {
        console.log("Error :", error);
      })
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => {
      console.log(`${result.user.email} ha cerrado sesión`)
      })
      .catch(error => {
      console.log("Error :", error);
      })
  }

  renderLoginButton(){
    //si el usuario esta logeado..
    if(this.state.user!==null){
      return(
        <div>
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola { this.state.user.displayName}</p>
          <br/>
          <p>Subir foto</p>
          <br/>
          <FileUpload/>
          <button onClick={this.handleLogout}>Salir</button>
        </div>
      );
    } else{
      //sino..
      return(
      <button onClick={this.handleAuth}>Iniciar Sesión con Google</button>
      );
    }

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            MarquinGram
          </p>
          <br/>
          {this.renderLoginButton()}
        </header>
        
      </div>
    );
  }
}

export default App;
