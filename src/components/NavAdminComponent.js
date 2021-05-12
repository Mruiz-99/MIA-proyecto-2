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
                        administrador
                    </li>
                    <li>
                        <Link to='carga'>
                            Carga Masiva
                    </Link>
                    </li>
                    <li>
                        <Link to=''>
                            Jornadas
                    </Link>
                    </li>
                    <li>
                        <Link to=''>
                            Temporada
                    </Link>
                    </li>
                    <li>
                        <Link to=''>
                            Recompensas
                    </Link>
                    </li>
                    <li>
                        <Link to=''>
                            Deportes
                    </Link>
                    </li>
                    <li>
                        <Link to=''>
                            Reportes
                    </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Navbar;