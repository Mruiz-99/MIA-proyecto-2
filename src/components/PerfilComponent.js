import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './NavClienteComponent';

class Perfil extends Component {
    
    constructor(props) {
        super(props);
        this.Cuenta()
        this.state = {
            usu: "",
            pass: "",
            nom: "",
            ape: "",
            fec_nac: '',
            fec_reg: '',
            correo: "",
            foto: "",
            monthNames: ["JAN", "FEB", "MAR", "APR", "MAY", "Jun",
            "Jul", "AUG", "SEP", "OCT", "NOV", "DEC"
        ]
        };

        this.setUsu = this.setUsu.bind(this)
        this.setPass = this.setPass.bind(this)
        this.setNom = this.setNom.bind(this)
        this.setApe = this.setApe.bind(this)
        this.setNac = this.setNac.bind(this)
        this.setCorreo = this.setCorreo.bind(this)
        this.setFoto = this.setFoto.bind(this)
        
    }
    setUsu = (u) => {
        this.setState(prevState => ({
            ...prevState,
            usu: u.target.value
        }))
    }
    setPass = (p) => {
        this.setState(prevState => ({
            ...prevState,
            pass: p.target.value
        }))
    }
    setNom = (n) => {
        this.setState(prevState => ({
            ...prevState,
            nom: n.target.value
        }))
    }
    setApe = (a) => {
        this.setState(prevState => ({
            ...prevState,
            ape: a.target.value
        }))
    }
    setNac = (n) => {
        var d = this.convertDateFormat(n.target.value);
        this.setState(prevState => ({
            ...prevState,
            fec_nac: d
        }))
    }
    setCorreo = (c) => {
        this.setState(prevState => ({
            ...prevState,
            correo: c.target.value
        }))
    }
    setFoto = (f) => {
        this.setState(prevState => ({
            ...prevState,
            foto: f.target.value
        }))
    }

    convertDateFormat = (string) => {
        var info = string.split('-');
        return info[2] + '-' + this.state.monthNames[Number(info[1])-1] + '-' + info[0];
    }

    Cuenta = async () => {
        await axios.get("http://localhost:4000/datos_usuario/").then(response => {   
        var array = response.data.split(",")
        this.setState({
                usu: array[0],
                pass: array[1],
                nom: array[2],
                ape: array[3],
                fec_nac: array[4],
                fec_reg: array[5],
                correo: array[6],
                foto: array[7]
            });
        })

    }

    guardar = async (e) => {
        e.preventDefault();
        const user = {
            usuario: this.state.usu.toString(),
            password: this.state.pass.toString(),
            nombre: this.state.nom.toString(),
            apellido: this.state.ape.toString(),
            fecha_nacimiento: this.state.fec_nac,
            fecha_registro: this.state.fec_reg,
            correo: this.state.correo.toString(),
            foto: this.state.foto.toString()
        }
        await axios.post("http://localhost:4000/actualizar_usuario/", user).then(response =>{
            alert(response.data) })
            window.location.replace('');
    }




    render() {
        return (
            <div id="pantalla">
                <Navbar usuario={this.state.usu} /> 
                <button id = "boton"><Link to='usuario'>Ir calendario
                </Link></button>
                <form id="cuadro">
                    <h1>Perfil usuario</h1>
                    <div className="form-group">
                        <label><h2>Usuario: </h2></label>
                        <input value={this.state.usu} onChange={this.setUsu} type="text" className="form-control" placeholder="Ingrese usuario" />
                    </div>
                    <div className="form-group">
                        <label><h2>Contraseña:</h2> </label>
                        <input value={this.state.pass} onChange={this.setPass} type="password" className="form-control" placeholder="Ingrese contraseña " />
                    </div>
                    <div className="form-group">
                        <label><h2>Nombres: </h2></label>
                        <input value={this.state.nom} onChange={this.setNom} type="text" className="form-control" placeholder="Ingrese sus nombres" />
                    </div>
                    <div className="form-group">
                        <label><h2>Apellidos: </h2></label>
                        <input value={this.state.ape} onChange={this.setApe} type="text" className="form-control" placeholder="Ingrese sus apellidos" />
                    </div>
                    <div className="form-group">
                        <label><h2>Fecha de nacimiento: </h2></label>
                        <TextField
                            id="date"
                            label=""
                            type="date"
                            defaultValue="2020-01-01"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.setNac}
                        />
                    </div>
                    <div className="form-group">
                        <label><h2>Correo: </h2></label>
                        <input value={this.state.correo} onChange={this.setCorreo} type="mail" className="form-control" placeholder="Ingrese su correo" />
                    </div>
                    <div className="form-group">
                        <label><h2>Foto: </h2></label>
                        <input onChange={this.setFoto} type="file" className="form-control" placeholder="Seleccione foto de perfil" />
                    </div>
                    <button onClick={this.guardar} id="boton">Guardar
                </button>
                    
                </form>
                
            </div>
        );
    }
} export default Perfil;
