import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import emailjs from 'emailjs-com';
import {Link} from 'react-router-dom';

class Registro extends Component {
    
    constructor(props) {
        super(props);
        
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
        this.setReg = this.setReg.bind(this)
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
    setReg = (r) => {
        this.setState(prevState => ({
            ...prevState,
            fec_reg: r.target.value
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

    registrar = async (e) => {
        e.preventDefault();
        let newDate = new Date()
        const user = {
            usuario: this.state.usu.toString(),
            password: this.state.pass.toString(),
            nombre: this.state.nom.toString(),
            apellido: this.state.ape.toString(),
            fecha_nacimiento: this.state.fec_nac,
            fecha_registro: (newDate.getDate() < 10 ? 0 + "" + newDate.getDate() : newDate.getDate()) + "-" + this.state.monthNames[newDate.getMonth()] + "-" + newDate.getFullYear(),
            correo: this.state.correo.toString(),
            foto: this.state.foto.toString()
        }
        await axios.post("http://localhost:4000/registrar/", user).then(response =>{
            alert(response.data) })
            window.location.replace('');
    }




    render() {
        return (
            <div id="pantalla">
                <button id = "boton"><Link to='login'>Inicio de sesion
                </Link></button>
                <form id="cuadro">
                    <h1>Registrar usuario</h1>
                    <div className="form-group">
                        <label><h2>Usuario: </h2></label>
                        <input onChange={this.setUsu} type="text" className="form-control" placeholder="Ingrese usuario" />
                    </div>
                    <div className="form-group">
                        <label><h2>Contraseña:</h2> </label>
                        <input onChange={this.setPass} type="password" className="form-control" placeholder="Ingrese contraseña " />
                    </div>
                    <div className="form-group">
                        <label><h2>Nombres: </h2></label>
                        <input onChange={this.setNom} type="text" className="form-control" placeholder="Ingrese sus nombres" />
                    </div>
                    <div className="form-group">
                        <label><h2>Apellidos: </h2></label>
                        <input onChange={this.setApe} type="text" className="form-control" placeholder="Ingrese sus apellidos" />
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
                        <input onChange={this.setCorreo} type="text" className="form-control" placeholder="Ingrese su correo" />
                    </div>
                    <div className="form-group">
                        <label><h2>Foto: </h2></label>
                        <input onChange={this.setFoto} type="file" className="form-control" placeholder="Seleccione foto de perfil" />
                    </div>
                    <button onClick={this.registrar} id="boton">Registrarse
                </button>
                    
                </form>
                
            </div>
        );
    }
} export default Registro;
