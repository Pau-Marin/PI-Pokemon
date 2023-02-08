import React from "react"
import { Link } from "react-router-dom"

import PokeTypes from "../PokeTypes/PokeTypes"

import "./PokeCard.css"

export default function PokeCard(props) {
  const { id, name, img, types } = props
  return (
    <div className="pokeCard">
      <Link to={`/pokemon/${id}`}>
        <h2>{name}</h2>
        <img className="pokeImg" src={img} alt={name} />
      </Link>
      <PokeTypes types={types} />
    </div>
  )
}
