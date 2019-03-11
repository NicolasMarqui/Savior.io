import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Nav from './Nav';

class DashBoard extends Component {

    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            allOp: [],
            todasOperacoesUsuarios: [],
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/money/user/5c86b694a1590f211cb3f4ff')
            .then(res => this.setState({ allOp: res.data }))

        axios.get('http://localhost:5000/api/money/all/5c86b694a1590f211cb3f4ff')
            .then(res => this.setState({ todasOperacoesUsuarios: res.data }))
    }

    changeSideWidth = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    salve = (e) => {
        e.preventDefault();
        const newEntry = {
            idPessoa: "5c86b694a1590f211cb3f4ff",
            valorDinheiro: 200,
            operacao: "credito",
            descricao: "Faculdade"
        }


        axios.all([
            axios.post('http://localhost:5000/api/money/add', newEntry),
            axios.put(`http://localhost:5000/api/money/edit?id=${newEntry.idPessoa}&op=${newEntry.operacao}&valor=${newEntry.valorDinheiro}`),
            axios.get('http://localhost:5000/api/money/user/5c86b694a1590f211cb3f4ff')
        ])
        .then(axios.spread((post, put, get) => {
            this.setState({allOp: put.data})
            
        }))
    }

  render() {
    return (
      <React.Fragment>
          <div className="dashWrapper">
            <div className="sideDash" style={this.state.isOpen ? {width: '300px'} : {width: '60px'}}>
                <i className="fas fa-bars fa-2x" onClick={this.changeSideWidth}
                style={this.state.isOpen ? {left: '4%'} : {left: '20%'}}
                ></i>
                <code style={this.state.isOpen ? {display: 'none'} : {display: 'block'}}>Savior.io</code>
                <div className="centerSideItems" style={!this.state.isOpen ? {display: 'none'} : {display: 'flex'}}>
                    <ul>
                        <li><a href="_">Home</a></li>
                        <li><a href="_">Home</a></li>
                        <li><a href="_">Home</a></li>
                    </ul>
                </div>
            </div>
            <div className="topFixedDash">
                <h3>Seja bem vindo, <span>Nicolas</span></h3>
                <i className="fas fa-sign-out-alt fa-2x"></i>
            </div>
            <div className="mainContentDash">
                <div className="displayAmount" >
                    <code>Você possui</code>
                    <h1>R${this.state.allOp.quantidadeDinheiro},00</h1>
                    <button onClick={this.salve}>Adicionar</button>
                </div>
                <div className="showEvents">
                    <div className="novaEntrada">
                     {
                         this.state.todasOperacoesUsuarios.length === 0 ? <h1>Nenhum registro</h1> : 
                         this.state.todasOperacoesUsuarios.map(el => (
                            <div key={el._id}>
                                <h1>{el.descricao}</h1>
                                <code>R${el.valorDinheiro}</code>
                                <p>{el.operacao}</p>
                            </div>
                        ))
                     }   
                    </div>
                    <div className="showGraphMoney">
                     graph
                    </div>
                    <div className="addNewOperation">
                     new
                    </div>
                </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
}

export default withRouter(DashBoard);