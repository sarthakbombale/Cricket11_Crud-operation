import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchJson, API_BASE } from "../utils/api.js";

export default function UpsertPage({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    fetchJson(`${API_BASE}/${id}`)
      .then(data => {
        setName(data.name || "");
        setAge(data.age || "");
        setEmail(data.email || "");
        setAvatar(data.avatar || "");
      })
      .catch(() => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return toast.warn("Name is required");
    const payload = { name, age, email, avatar };
    setSaving(true);
    try {
      if (isEdit) {
        await fetchJson(`${API_BASE}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
        toast.success("Updated successfully!");
      } else {
        await fetchJson(API_BASE, { method: "POST", body: JSON.stringify(payload) });
        toast.success("Cricketer added!");
      }
      navigate("/");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Container className="text-center my-5"><Spinner animation="border" variant="primary" /></Container>;

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm border-0">
        <div className="d-flex align-items-center mb-4">
          <Button variant="link" onClick={() => navigate(-1)} className="p-0 me-3">
            <ArrowLeft size={18} /> Back
          </Button>
          <h4 className="fw-semibold mb-0">{isEdit ? "Edit Cricketer" : "Add New Cricketer"}</h4>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={7}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder="Enter cricketer name" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Enter age" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Paste image URL" />
              </Form.Group>

              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Cricketer"}
              </Button>
            </Col>

            <Col md={5}>
              {avatar ? (
                <Image src={avatar} rounded fluid style={{ width: "100%", height: 250, objectFit: "cover", border: "1px solid #dee2e6" }} />
              ) : (
                <div className="bg-light d-flex align-items-center justify-content-center border rounded" style={{ height: 250 }}>
                  <span className="text-muted">Image preview</span>
                </div>
              )}
            </Col>
          </Row>
        </Form>
      </Card>

      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}
