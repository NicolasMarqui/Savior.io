import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Spinner from 'react-spinkit'

class DashBoard extends Component {

    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            allOp: [],
            todasOperacoesUsuarios: [],
            autoReload: false,
            isOpenModal: false,
            titulo: '',
            desc: '',
            op: 'credito',
            valor: '',
            isOpenMobile: false,
            defaultIndex: 1,
            despesaInfo: [],
            openDespesa: false,
            loadingPrice: false,
            loadingOp: false,
        }
    }

    componentDidMount = () => {

        console.log(localStorage.getItem('id'))
        console.log(localStorage.getItem('nome'))

        axios.get(`http://localhost:5000/api/money/user/${localStorage.getItem('id')}`)
            .then(res => {
                this.setState({ allOp: res.data , loadingPrice: true})
                console.log(res.data)
            })

        axios.get(`http://localhost:5000/api/money/all/${localStorage.getItem('id')}`)
            .then(res => this.setState({ todasOperacoesUsuarios: res.data , loadingOp: true}))
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
            idPessoa: localStorage.getItem('id'),
            valorDinheiro: this.state.valor,
            operacao: this.state.op,
            titulo: this.state.titulo,
            descricao: this.state.desc,
        }


        axios.all([
            axios.post('http://localhost:5000/api/money/add', newEntry),
            axios.put(`http://localhost:5000/api/money/edit?id=${newEntry.idPessoa}&op=${newEntry.operacao}&valor=${newEntry.valorDinheiro}`),
            axios.get(`http://localhost:5000/api/money/user/${newEntry.idPessoa}`)
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

    seeAll = () => {
        this.setState({ defaultIndex: 1 });
        window.scrollTo(0,700);
    }

    openInfoAll = (id) => {
        this.setState({ openDespesa: !this.state.openDespesa })
        console.log(id)
        axios.delete(`http://localhost:5000/api/money/despesa/${id}`)
            .then(res => {
                this.setState(prevState => {
                    return{
                        todasOperacoesUsuarios: prevState.todasOperacoesUsuarios.filter(m => m._id !== id)
                    }
                })
            })

        // window.location.reload()
    }

  render() {
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
                        <li className="active"><a href="_">Home</a></li>
                        <li><a href="_">Ver Todas</a></li>
                        <li style={{ cursor: 'pointer' }} onClick={() => this.setState({ isOpenModal: true, isOpen: false })}><a>Adicionar Nova</a></li>
                    </ul>
                </div>
            </div>
            <div className="fullNavDash">

            </div>
            <div className="topFixedDash">
                <i className={this.state.isOpenMobile ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2x'} onClick={this.changeSideHeight}
                ></i>
                <h3><span>{localStorage.getItem('nome')}</span></h3>
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
                        <label style={{color: 'white'}} htmlFor="autoreload">Auto-Reload?</label>
                        <input type="checkbox" name="autoreload" onChange={() => this.setState({ autoReload: !this.state.autoReload })}/>
                        <button onClick={this.salve}>Salvar</button>
                    </div>
                </div>
                <div className="rightSideMain">
                    <div className="overlayRight">
                    </div>
                    <div className="centerTextRightMain">
                        <code>Seu saldo atual</code>
                        {
                            !this.state.loadingPrice ? <Spinner style={{margin: '2% auto'}} name="line-scale-pulse-out-rapid" />:
                            <h1>R${this.state.allOp.quantidadeDinheiro},00</h1>
                        }
                    </div>
                </div>
                <div className="leftSideMain">
                    <div className="topMain">
                        <code>Seja bem vindo<br/><span>{
                         
                         !this.state.loadingPrice ? <Spinner style={{margin: '2% auto'}} name="circle" /> :
                         
                         this.state.allOp.nome
                            
                        }</span></code>
                    </div>
                    <div className="bottomMain">
                        <button onClick={() => this.openModal(true)}>Adicionar Despesa</button>
                        <button onClick={this.seeAll}>Ver Todas</button>
                    </div>
                </div>
            </div>
          </div>
          <div className="showTodas">
          <Tabs defaultIndex={this.state.defaultIndex}>
            <TabList>
                <Tab style={{backgroundColor: '#3A3B42', color: 'white'}}>Informações</Tab>
                <Tab >Suas despesas</Tab>
            </TabList>

            <TabPanel>
                <p>teste</p>
            </TabPanel>
            <TabPanel>
                <code>Ultimos Lançamentos</code>
                {
                !this.state.loadingOp ? <Spinner className="centerSpin" name="folding-cube" /> :
                this.state.todasOperacoesUsuarios.length === 0 ? <h1>Nenhuma Operação</h1> :
                <table className="tableTodas">
                    <tbody>
                        <tr>
                            <td>Titulo</td>
                            <td>Valor</td>
                            <td>Descrição</td>
                            <td>Data</td>
                        </tr>
                        {
                            this.state.todasOperacoesUsuarios.map(el => (
                                <tr key={el._id} 
                                style={el.operacao === 'debito' ? {backgroundColor: '#E41F28'} : {backgroundColor: '#039145'}}
                                onClick={() => this.openInfoAll(el._id)}>
                                    <td>{el.titulo}</td>
                                    <td width="30%"><span>{el.operacao === 'credito' ? '+' : '-'}</span>R${el.valorDinheiro}</td>
                                    <td>{el.descricao}</td>
                                    <td className="mobilePost">{el.horaPost}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                }
            </TabPanel>
        </Tabs>
          </div>
      </React.Fragment>
    )
  }
}

export default withRouter(DashBoard);
