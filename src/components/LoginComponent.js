import React, { Component } from 'react';
import Header from './HeaderComponent';

class Login extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id = "pantalla">
            <Header/>
            <form>
                <h3>Inicio de sesion</h3>
                <div className="form-group">
                    <label>Usuario: </label>
                    <input type="text" className="form-control" placeholder="Ingrese usuario" />
                </div>

                <div className="form-group">
                    <label>Contraseña: </label>
                    <input type="password" className="form-control" placeholder="Ingrese contraseña " />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </div>
        );
    }
}export default Login;