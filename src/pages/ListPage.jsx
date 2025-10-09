import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Image, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PlusCircle, Edit3, Trash2, Search } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchJson, API_BASE } from "../utils/api.js";

const CRICKETERS = [
  { name: "Virat Kohli", age: 36, email: "virat@india.com", avatar: "https://upload.wikimedia.org/wikipedia/commons/1/14/Virat_Kohli_2024.jpg" },
  { name: "Rohit Sharma", age: 38, email: "rohit@india.com", avatar: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Rohit_Sharma_in_2023.jpg" },
  { name: "Ben Stokes", age: 34, email: "ben@england.com", avatar: "https://upload.wikimedia.org/wikipedia/commons/5/55/Ben_Stokes_2023.jpg" },
  { name: "Babar Azam", age: 31, email: "babar@pakistan.com", avatar: "https://upload.wikimedia.org/wikipedia/commons/9/93/Babar_Azam_portrait.jpg" },
  { name: "Pat Cummins", age: 33, email: "pat@australia.com", avatar: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Pat_Cummins_2023.jpg" },
];

export default function ListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      let data = await fetchJson(API_BASE);
      if (data.length === 0) {
        for (const c of CRICKETERS) {
          await fetchJson(API_BASE, { method: "POST", body: JSON.stringify(c) });
        }
        data = await fetchJson(API_BASE);
        toast.info("Preloaded cricketers data!");
      }
      setItems(data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this player?")) return;
    try {
      await fetchJson(`${API_BASE}/${id}`, { method: "DELETE" });
      toast.success("Cricketer deleted!");
      setItems(prev => prev.filter(it => it.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  }

  const filtered = items.filter(
    it => it.name.toLowerCase().includes(search.toLowerCase()) || it.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <Card className="p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="fw-semibold text-primary mb-0">Cricketer 11</h3>
              <Link to="/add" className="btn btn-success d-flex align-items-center">
                <PlusCircle size={18} className="me-2" /> Add New
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><Search size={16} /></InputGroup.Text>
            <Form.Control
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        {loading ? (
          <Col className="text-center py-5"><Spinner animation="border" variant="primary" /></Col>
        ) : filtered.length === 0 ? (
          <Col><Card className="p-5 text-center shadow-sm"><h5 className="text-muted">No cricketers found.</h5></Card></Col>
        ) : (
          filtered.map(it => (
            <Col md={4} lg={3} sm={6} key={it.id} className="mb-4">
              <Card className="shadow-sm border-0 h-100 hover-shadow">
                <Image src={it.avatar} alt={it.name} style={{ height: 220, width: "100%", objectFit: "cover", borderTopLeftRadius: ".5rem", borderTopRightRadius: ".5rem" }} />
                <Card.Body>
                  <Card.Title className="fw-bold text-dark">{it.name}</Card.Title>
                  <Card.Text className="text-muted mb-3">
                    <small><strong>Age:</strong> {it.age} <br /><strong>Email:</strong> {it.email}</small>
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Link to={`/edit/${it.id}`} className="btn btn-outline-primary btn-sm w-50">
                      <Edit3 size={14} className="me-1" /> Edit
                    </Link>
                    <Button variant="outline-danger" size="sm" className="w-50" onClick={() => handleDelete(it.id)}>
                      <Trash2 size={14} className="me-1" /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}
