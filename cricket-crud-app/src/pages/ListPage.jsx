import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchPlayers, deletePlayer } from "../api/api";
import CardItem from "../components/CardItem";
import Spinner from "../components/Spinner";

const ListPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const data = await fetchPlayers();
        setPlayers(data);
      } catch (error) {
        toast.error("Failed to fetch players");
      } finally {
        setLoading(false);
      }
    };

    getPlayers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await deletePlayer(id);
        setPlayers(players.filter((player) => player.id !== id));
        toast.success("Player deleted successfully");
      } catch (error) {
        toast.error("Failed to delete player");
      }
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="my-4">Cricket Players</h1>
      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-4"
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          {filteredPlayers.map((player) => (
            <CardItem key={player.id} player={player} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListPage;