import React, { Component } from "react";

export default class Api extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: "",
      isFetching: false,
      isError: false,
    };
    // Igual que antes bind toda funcion que ejecutes
    this.getOptions = this.getOptions.bind(this);
  }

  async getOptions() {
    this.setState({ isFetching: true });
    const res = await fetch(
      `https://dry-spire-72214.herokuapp.com/api/pokemon/${1}` /* 3 reemplaza el 1 por this.props.id y ahora ya puede hacer un fetch ligado a un state*/
    );
    let data = "";
    try {
      data = await res.json();
    } catch {
      data =
        "la respuesta no llego en json. no recuerdo que devuelve esta llamada";
    }

    console.log(res, data, "line 24");
    if (res.status === 200) {
      this.setState({ pokemon: data[0].name });
    } else {
      this.setState({ isError: "Hubo un error en la api" });
    }
    this.setState({ isFetching: false });
  }
  /**
   * espero que sepas usar esto, es muy importante pero creo que si
   */
  componentDidMount() {
    this.getOptions();
  }

  render() {
    /**
     * esta area no solo sirve de playground, tambien me gusta para debuggear los console logs porque se muestran los states del componente actual, no del que vamos a destruirdestruido
     */
    console.log(this.props);

    if (this.state.isError) {
      return <p>There was an error in the api</p>;
    }
    return (
      <div>
        {this.state.isFetching ? (
          <p>Loading...</p>
        ) : (
          <p>
            {this.state.pokemon} <br/>Para mas información mira este vídeo de FAZT, es viejo pero es lo que buscas{" "}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/67ASQxnnyFE"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </p>
        )}
      </div>
    );
  }
}
