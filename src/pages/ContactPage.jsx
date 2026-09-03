import { useState } from "react";
import SocialRow from "../components/SocialRow";
import "./ContactPage.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    // TODO: wire this up to your form backend of choice (Formspree, EmailJS, etc).
  }

  return (
    <div className="panel-inner contact-page">
      <h1>Let's stay in touch!</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <p className="contact-form-label">Contact Us</p>
        <input
          type="text"
          placeholder="your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="your message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button type="submit" className="pill-btn send-btn">
          {sent ? "Sent!" : "Send"}
        </button>
      </form>
      <SocialRow />
    </div>
  );
}
