import React, { Component } from 'react';
import Nav from './Nav';

export default class SignUp extends Component {
  render() {
    return (
      <React.Fragment>
          <div className="wrapperSignUp">
          <Nav />
            <div className="leftSideSignUp">
                <div className="btLft">
                    <h1>Think</h1><br/>
                    <h1>Save</h1><br/>
                    <h1>Smile !</h1>
                </div>
            </div>
            <div className="rightSideSignUp">
                <div className="centerSign">
                    <code>Seja bem vindo</code>
                    <div className="firstSign">
                        <h1>Digite seu <span>nome</span> ,seu <span>email</span> e sua <span>senha</span></h1>
                        <input type="text" placeholder="Nome"/>
                        <input type="text" placeholder="email"/>
                        <input type="password" placeholder="Senha"/>
                    </div>
                    <div className="thirdSign">
                        <h1>Qual sua quantidade de <span>grana</span>?</h1>
                        <label htmlFor="quantidadeDinheiro">Seu dinheiro Atual</label>
                        <input type="number" nome="quantidadeDinheiro" placeholder="0"/>
                    </div>
                    <button>Inscreva-se</button>
                </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
}
