import React, { Component } from 'react'

export default class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      senha: '',
    }
  }

  setValues = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendLogin = e => {
    console.log(this.state)
  }

  render() {
    return (
      <React.Fragment>
        <div className="loginWrapper">
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
              <a href="_">Não tem Conta?</a>
            </div>
          </div>
          <div className="leftSideLogin" />
          <div className="rightSideLogin" />
        </div>
      </React.Fragment>
    );
  }
}
