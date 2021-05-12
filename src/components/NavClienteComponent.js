import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="navegacion">
                <ul id="nav">
                    <li id="usuario">
                        {this.props.usuario}
                    </li>
                    <li>
                        <Link to='perfil'>
                            Perfil
                    </Link>
                    </li>
                    <li>
                        <Link to=''>
                            Membresia
                    </Link>
                    </li>
                    <li>
                        <Link to=''>
                            Eventos
                    </Link>
                    </li>
                    <li>
                        <Link to=''>
                            Recompensas
                    </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Navbar;