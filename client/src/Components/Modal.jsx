import React from 'react'

export default function Modal(props) {
    console.log(props)
  return (
    <React.Fragment>
        <div className="modalInfo" style={this.state.openDespesa ? {display: 'flex'} : {display: 'none'}}>
            <i className="fas fa-times-circle fa-3x"></i>
            <div className="centerInfoDespesa">
                {
                    this.state.despesaInfo ? 
                    this.state.despesaInfo.map(el => (
                        <table key={el._id}>
                            <tbody>
                                <tr>
                                    <td>Titulo</td>
                                    <td>Valor</td>
                                    <td>Descrição</td>
                                    <td>Data</td>
                                </tr>
                                <tr>
                                    <td>{el.titulo}</td>
                                    <td><span>{el.operacao === 'credito' ? '+' : '-'}</span>R${el.valorDinheiro}</td>
                                    <td>{el.descricao}</td>
                                    <td>{el.horaPost}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))
                    :
                    <h1>Ops...Algo deu errado</h1>
                }
            </div>
          </div>
    </React.Fragment>
  )
}
