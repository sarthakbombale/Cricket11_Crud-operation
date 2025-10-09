import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-primary text-white p-3">
            <h1 className="text-center">Cricket Player Management</h1>
            <nav className="text-center">
                <Link to="/" className="text-white mx-2">Home</Link>
                <Link to="/upsert" className="text-white mx-2">Add Player</Link>
            </nav>
        </header>
    );
};

export default Header;