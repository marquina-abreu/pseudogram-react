import React, {Component } from 'react';
import firebase from 'firebase';

class FileUpload extends Component {

    constructor(){
        super();
        this.state= {
            uploadValue: 0, // progreso de subida de img
            picture: null
        }

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event){
        const file = event.target.files[0];

        console.log("bla ",file);
        const storageRef = firebase.storage().ref(`/fotos/${file.name}`);

        const task = storageRef.put(file); // subiendo fichero a firebase..

        //storageRef me da un evento change para saber como va la subida.. y tiene 3 parametros..

        task.on('state_changed', snapshot => {
            let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // porcentaje de la carga

            this.setState({
                uploadValue: porcentaje
            });
            },
            err =>{
                console.log(err.message);
        }, () =>{ // parametro de ya haber finalizado la subida.
            
            //100% img subida
            this.setState({
                uploadValue: 100,
                picture: task.snapshot.downloadURL 
            });
        });

    }

    render(){
        return(
            <div>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br/>
                <input type="file" onChange={this.handleUpload} />
                <br/>
                <img width="320" src={this.state.picture} alt="" />
            </div>
        );
    }



}


export default FileUpload;