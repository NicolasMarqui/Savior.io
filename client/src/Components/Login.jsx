import React, { Component } from 'react';
import Nav from './Nav';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      senha: '',
      redirect: false,
      dadosUser: {},
    }
  }

  setValues = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount = () => {
    localStorage.clear();
  }

  sendLogin = e => {

    e.preventDefault();
    
    const novoUsuario = {
      email: this.state.email,
      senha: this.state.senha
    }

    axios.post('http://localhost:5000/api/user/login', novoUsuario)
      .then(res => {
        localStorage.setItem('id', res.data.user.id);
        localStorage.setItem('nome', res.data.user.nome);
        
        this.setState({ dadosUser: res.data.user, redirect: true })

      })
      .catch(err => console.log(err));
  }

  render() {

    const { redirect, dadosUser } = this.state;

    if(redirect){
      return <Redirect to={`/dashboard/${dadosUser.nome}`} />
    }

    return (
      <React.Fragment>
        <div className="loginWrapper">
          <Nav />
          <div className="centerLogin">
            <div className="titleLogin">
              <h1>Venha fazer parte</h1>
            </div>
            <div className="bodyLogin">
              <input type="text" 
              placeholder="Email" 
              value={this.state.email}
              name="email"
              onChange={this.setValues}
              />
              <input type="password" 
              placeholder="Senha" 
              value={this.state.senha}
              name="senha"
              onChange={this.setValues}
              />
              <button onClick={this.sendLogin}>Login</button>
            </div>
            <div className="footerLogin">
              <Link to="/signup">Não tem Conta?</Link>
            </div>
          </div>
          <div className="leftSideLogin" />
          <div className="rightSideLogin" />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
