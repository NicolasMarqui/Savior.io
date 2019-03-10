import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import Wallet from '../Assets/wallet.png';
import Review from './pessoas';

const Main = () => {

    // const [title, changeTitle] = useState("Salve");

    // function change() {
    //     setInterval(getName(), 4000);
    // } 

    // const getName = () => {
    //     changeTitle("Aproveite");
    // }

    // useEffect(() => {
    //     change();
    // }, [])

    return(
        <React.Fragment>
            <div className="mainWrapper">
                <Nav />
                <div className="sideSocial">
                    <i className="fab fa-facebook fa-2x"></i>
                    <i className="fab fa-instagram fa-2x"></i>
                    <i className="fab fa-youtube fa-2x"></i>
                </div>
                <div className="centerMain">
                    <div className="textMain">
                        <h1><code></code> <br/>Seu <span>Dinheiro</span></h1>
                        <button>Saiba Mais</button>
                    </div>
                    <img src={Wallet} alt="wallet" height="400px" width="auto"/>
                </div>
            </div>
            <div className="aboutMain">
                <div className="infoAbout">
                    <i className="fas fa-wallet fa-8x"></i>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ex facere officia facilis iste molestiae natus nisi quod repellat sit esse ullam nulla, provident laudantium dignissimos deleniti tempore laborum totam aliquid? Nostrum minima ipsum dolor aspernatur facilis laborum excepturi, praesentium eligendi, a necessitatibus velit quae? Veniam, at fuga. Magnam, repudiandae?</p>
                </div>
                <div className="aboutText">
                    <h1>Não perca mais <span>Tempo</span> e nem <span>Dinheiro</span></h1>
                    <i className="fas fa-arrow-down fa-3x"></i>
                </div>
            </div>
            <div className="howTo">
                <div className="step step1">
                    <h1>1°</h1>
                    <i className="fas fa-user-lock fa-4x"></i>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate maxime, enim sunt voluptas earum reprehenderit corrupti accusantium aliquid dolorum eaque?</p>
                </div>
                <div className="step step2">
                    <h1>2°</h1>
                    <i className="fas fa-home fa-4x"></i>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis enim neque iusto fugit laboriosam, suscipit architecto cupiditate nihil quasi voluptatem.</p>
                </div>
                <div className="step step3">
                    <h1>3°</h1>
                    <i className="far fa-money-bill-alt fa-4x"></i>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi deleniti aliquid suscipit sequi blanditiis quo et tenetur vitae adipisci repellat?</p>
                </div>
            </div>
            <div className="userReview">
                {Review.map((el,index) => (
                    <div className="person" key={index}> 
                        <img src={el.avatar} alt="avatar" height="128px" width="128px"/>
                        <h1>{el.nome}<br />{el.idade} anos</h1>
                        <code>{el.local}</code>
                        <p>{el.review}</p>
                        <p>Nota {el.nota}/5</p>
                    </div>
                ))}
            </div>
            <div className="contato">
                <i className="fas fa-arrow-up fa-3x" onClick={() => window.scrollTo(0, 0)}></i>
                <h1>Duvidas?</h1>
                <div className="centerContato">
                    <input type="text" placeholder="Nome"/>
                    <input type="email" placeholder="Email"/>
                    <textarea cols="30" rows="10" placeholder="Mensagem">
                    </textarea>
                </div>
            </div>
        </React.Fragment>   
    )
}

export default Main;