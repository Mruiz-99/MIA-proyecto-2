import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Navbar from './NavClienteComponent';

class Usuario extends Component {

    constructor(props) {
        super(props);
        this.Cuenta()
        this.state = {
            usu: ""
        };
        //this.setUsu = this.setUsu.bind(this)
    }
    Cuenta = async () => {
        await axios.get("http://localhost:4000/cuenta_usuario/").then(response => {
            this.setState({
                usu: response.data
            });
        })

    }
    render() {
        return (
            <div id="pantalla">
                <Navbar usuario={this.state.usu} />
                <FullCalendar
                id = "calendario"
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    height={900}
                    events={[
                        { title: 'event 1', date: '2021-05-01' },
                        { title: 'event 2', date: '2021-05-02' }
                    ]}
                />
            </div>
        );
    }
} export default Usuario;