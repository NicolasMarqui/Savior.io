import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class DashBoard extends Component {

    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            allOp: [],
            todasOperacoesUsuarios: [],
            autoReload: true,
            isOpenModal: false,
            titulo: '',
            desc: '',
            op: 'credito',
            valor: '',
            isOpenMobile: false,
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/money/user/5c88f162f2a2b72f0c55e5cb')
            .then(res => this.setState({ allOp: res.data }))

        axios.get('http://localhost:5000/api/money/all/5c88f162f2a2b72f0c55e5cb')
            .then(res => this.setState({ todasOperacoesUsuarios: res.data }))
    }

    changeSideWidth = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    salve = (e) => {
        e.preventDefault();

        console.log(this.state)


        const newEntry = {
            idPessoa: "5c88f162f2a2b72f0c55e5cb",
            valorDinheiro: this.state.valor,
            operacao: this.state.op,
            titulo: this.state.titulo,
            descricao: this.state.desc,
        }


        axios.all([
            axios.post('http://localhost:5000/api/money/add', newEntry),
            axios.put(`http://localhost:5000/api/money/edit?id=${newEntry.idPessoa}&op=${newEntry.operacao}&valor=${newEntry.valorDinheiro}`),
            axios.get('http://localhost:5000/api/money/user/5c88f162f2a2b72f0c55e5cb')
        ])
        .then(axios.spread((post, put, get) => {
            console.log(put,post,get)
            this.setState({allOp: put.data})
            
        }))

        if(this.state.autoReload){
            window.location.reload()
        }
    }

    openModal = (status) => {
        this.setState({ isOpenModal: status })
    }

    handleData = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    changeSideHeight = () => {
        this.setState({ isOpenMobile: !this.state.isOpenMobile })
    }

  render() {

    let total = this.state.todasOperacoesUsuarios.length;

    return (
      <React.Fragment>
          <div className="dashWrapper">
            <div className="sideDash" style={this.state.isOpen ? {width: '300px'} : {width: '60px'}}>
                <i className={this.state.isOpen ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2x'} onClick={this.changeSideWidth}
                style={this.state.isOpen ? {left: '4%'} : {left: '20%'}}
                ></i>
                <code style={this.state.isOpen ? {display: 'none'} : {display: 'block'}}>Savior.io</code>
                <div className="centerSideItems" style={!this.state.isOpen ? {display: 'none'} : {display: 'flex'}}>
                    <ul>
                        <li><a href="_">Home</a></li>
                        <li><a href="_">Ver Todas</a></li>
                        <li><a href="_">Adicionar Nova</a></li>
                    </ul>
                </div>
            </div>
            <div className="fullNavDash">

            </div>
            <div className="topFixedDash">
                <i className={this.state.isOpenMobile ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2x'} onClick={this.changeSideHeight}
                ></i>
                <h3><span>Nicolas</span></h3>
            </div>
            <div className="showNavMobile" style={this.state.isOpenMobile ? { display: 'flex' } : { display: 'none' }}>
                <div className="centerMobileNav">
                    <ul>
                        <li><a href="_">Home</a></li>
                        <li><a href="_">Todas</a></li>
                        <li><a href="_">Minha Conta</a></li>
                    </ul>
                </div>
            </div>
            <div className="mainContentDash">
                <div className="fullModalScreen" style={this.state.isOpenModal ? { display: 'flex' } : { display: 'none' }}>
                    <i className="fas fa-times fa-2x" onClick={() => this.openModal(false)}></i>
                    <div className="centerModal">
                        <h1>Adicionar Despesa</h1>
                        <input type="text" placeholder="Titulo" value={this.state.titulo} onChange={this.handleData} name="titulo"/>
                        <input type="text" placeholder="Valor" value={this.state.valor} onChange={this.handleData} name="valor"/>
                        <select name="select" value={this.state.op} onChange={(e) => this.setState({ op: e.target.value })}>
                            <option disabled>Escolha a operacao</option>
                            <option value="credito">Crédito</option>
                            <option value="debito">Débito</option>
                        </select>
                        <input type="text" placeholder="Descrição" value={this.state.desc} onChange={this.handleData} name="desc"/>
                        <button onClick={this.salve}>Salvar</button>
                    </div>
                </div>
                <div className="displayAmount" >
                    <div className="leftSideAmount">
                        <button onClick={() => this.openModal(true)}>Adicionar</button>
                        <label htmlFor="check">Auto-reload</label>
                        <input type="checkbox" name="check" checked={this.state.autoReload} onChange={() => this.setState({ autoReload: !this.state.autoReload })}/>
                    </div>
                    <div className="rightSideAmount">
                        <code>Você possui</code>
                        <h1>R${this.state.allOp.quantidadeDinheiro},00</h1>
                    </div>
                </div>
                <div className="showEvents">
                    <div className="novaEntrada">
                    <code>Ultimos Lançamentos</code>
                    <table>
                        <tbody>
                            <tr>
                                <td>Titulo</td>
                                <td>Valor</td>
                                <td>Operação</td>
                                <td>Descrição</td>
                                <td>Data</td>
                            </tr>
                            {
                                this.state.todasOperacoesUsuarios.length === 0 ? <h1>Nenhum registro</h1> : 
                                this.state.todasOperacoesUsuarios.map(el => (
                                    <tr key={el._id} style={el.operacao === 'debito' ? {backgroundColor: 'red'} : {backgroundColor: 'green'}}>
                                        <td>{el.titulo}</td>
                                        <td><span>{el.operacao === 'credito' ? '+' : '-'}</span>R${el.valorDinheiro}</td>
                                        <td>{el.operacao}</td>
                                        <td>{el.descricao}</td>
                                        <td>{el.horaPost}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                    <div className="showGraphMoney">
                     graph
                    </div>
                </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
}

export default withRouter(DashBoard);
