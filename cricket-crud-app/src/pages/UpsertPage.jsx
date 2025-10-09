import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormItem from "../components/FormItem";
import Spinner from "../components/Spinner";
import { createPlayer, updatePlayer, getPlayerById } from "../api/api";

const UpsertPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchPlayer = async () => {
                try {
                    const data = await getPlayerById(id);
                    setPlayer(data);
                    setIsEditing(true);
                } catch (error) {
                    toast.error("Failed to fetch player data.");
                } finally {
                    setLoading(false);
                }
            };
            fetchPlayer();
        } else {
            setPlayer({ name: "", avatar: "", position: "" });
            setLoading(false);
        }
    }, [id]);

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            if (isEditing) {
                await updatePlayer(id, formData);
                toast.success("Player updated successfully!");
            } else {
                await createPlayer(formData);
                toast.success("Player created successfully!");
            }
            navigate("/list");
        } catch (error) {
            toast.error("Failed to save player data.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container">
            <h1>{isEditing ? "Edit Player" : "Add Player"}</h1>
            <FormItem player={player} onSubmit={handleSubmit} />
        </div>
    );
};

export default UpsertPage;