import React, { Component } from "react";
import ChildComponent from "./ChildComponent";

export default class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      keyword:"",
      showChildComponent: false,
      id:0 // este es el state que vamos a pasar al componente CHILD    
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // Sin estas línea surge un error porque el viejo REACT
    // no sabe de donde vienen estas funciones, aunque uses el this.
    //Recuerda que podremos pasar estados y funciones de componentes padres a hijos sin problemas
    //Y por eso, hacer bind the estas funciones es un requisito
  }

  handleChange(e) {
    this.setState({ keyword:e.target.value });
    }

  handleSubmit(e){
    // preventDefault todo submit de cualquier formulario en react. nunca he usado un submit sin preventDefault
    e.preventDefault() 
    this.setState({keyword:'', showChildComponent:true, id: this.state.keyword });
  }

  render() {
    /**
     * AQUI PUEDES CREAR LOGICA ANTES DEL RENDERIZADO FINAL
     * PLAYGROUND no hagas mucho caso a esta lineas pero juega si gustas
     */
    const stateToArray = this.state.keyword.split("")
    const juega = stateToArray.map(e=> <p key={e + stateToArray.indexOf(e)}>{e}</p>)
    console.log(juega)
    /**
     * 
     */
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button>search</button>
          <input
            placeholder="search for gifs..."
            onChange={this.handleChange}
            type="text"
            value={this.state.keyword}
          />
        </form>
        {juega}
        {/* 1 ESTE COMPONENTE CHILDCOMPONENT HAY QUE REEMPLAZARLO, pero ejecuta el formulario y mira la consola. Me interesa que veas el console.log de this.props*/}
        {/* 2 Veras que es un objeto vacío. ahora ya puedes reemplazar por el componente en comentarios de la derecha y haz submit al formulario*/}
        {/* veras que los props de este child son id y type (type no sirve para nada en este programa) Mira el componente CHILDCOMPONENT para más instrucciones */}
        { this.state.showChildComponent? <ChildComponent /> : <p>Please submit a number between 1-890 to obtain a pokemon</p> } {/* <ChildComponent id={this.state.id} type="otro prop" /> */}
      </div>
    );
  }
}
