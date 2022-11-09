import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

export class PokeTypes extends Component {
  componentDidMount() {
    this.props.getAllTypes();
  }

  render() {
    return (
      <div>
        <h1>Esto es la lista de tipos de Pokemons</h1>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    types: state.types,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PokeTypes);
