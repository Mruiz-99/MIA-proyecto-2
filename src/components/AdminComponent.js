import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavAdminComponent';

class Admin extends Component {

    constructor(props){
        super(props);
        this.state = {
        };

        //this.setUsu = this.setUsu.bind(this)
    }

    render(){
        return(
            <div id = "pantalla">
            <Navbar/>
            </div>
        );
    }
}export default Admin;