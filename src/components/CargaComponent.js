import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { FilePicker } from 'react-file-picker'
import { Link } from 'react-router-dom';
import Navbar from './NavAdminComponent';
import yaml from "js-yaml"

class Carga extends Component {

    constructor(props) {
        super(props);
        this.Cuenta()
        this.state = {
            usu: "",
            title: ""
        };

        this.setUsu = this.setUsu.bind(this)

    }
    setUsu = (u) => {
        this.setState(prevState => ({
            ...prevState,
            usu: u.target.value
        }))
    }
    Cuenta = async () => {
        await axios.get("http://localhost:4000/cuenta_usuario/").then(response => {
            this.setState({
                usu: response.data
            });
        })

    }
    load = {};
    handleFileChange = (file) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (ev) => {
            try {
                const doc = yaml.load(ev.target.result);
                this.load = JSON.stringify(doc, null, 2);
                console.log(this.load);
                this.sendPost();
            } catch (err) {
                console.log(err);
            }
        };
        this.setState({ title: file.name });
    }

    sendPost = async () => {
        await axios.post("http://localhost:4000/carga_masiva/", this.load).then(response => {
            alert(response.data)
        })

    }
    render() {
        return (
            <div id="pantalla">
                <Navbar usuario={this.state.usu} />
                <button id="boton"><Link to='administrador'> Ventana Principal                </Link></button>

                <form id="cuadro">
                    <label><h1>Carga Masiva: </h1></label>
                    <FilePicker
                        extensions={['md']}
                        onChange={this.handleFileChange}
                        onError={errMsg => alert(errMsg)}
                    >
                        <button id="boton">
                            Seleccionar archivo
                        </button>
                    </FilePicker>

                </form>

            </div >
        );
    }
} export default Carga;
