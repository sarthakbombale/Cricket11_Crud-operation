import React from "react";
import PropTypes from "prop-types";
import placeholderAvatar from "../assets/placeholder-avatar.svg";

const CardItem = ({ player, onDelete }) => {
  const { id, name, avatar, team } = player;

  return (
    <div className="card mb-3">
      <img
        src={avatar || placeholderAvatar}
        alt={`${name}'s avatar`}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Team: {team}</p>
        <button className="btn btn-danger" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

CardItem.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    team: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardItem;