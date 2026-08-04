"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Flame, Snowflake, Phone, Mail, CheckCircle2 } from "lucide-react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const COLORS = {
  bg: "#10151A",
  surface: "#1A2228",
  surfaceLight: "#232D34",
  copper: "#C9793F",
  copperSoft: "#E0A876",
  teal: "#4E93A6",
  tealSoft: "#7DB6C6",
  text: "#EDEAE3",
  muted: "#8A94A0",
  border: "#2C3840",
};

// ⚠️ Renseigne ici le numéro affiché publiquement sur le site.
// Le chatbot le communiquera spontanément en cas d'urgence.
const PHONE_DISPLAY = "06 12 99 62 03";
const PHONE_TEL = "+33612996203";
const EMAIL_DISPLAY = "barreauenergies@gmail.com";

// Endpoint Formspree — reçoit les demandes qualifiées par email.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzeppkyg";

const SUGGESTIONS = [
  "📝 Obtenir un devis",
  "🌡️ Pompe à chaleur / climatisation",
  "💧 Adoucisseur",
  "🚨 Dépannage urgent",
  "📍 Zone d'intervention",
  "💶 Combien coûte mon projet ?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "10px 14px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: COLORS.muted,
            animation: `be-bounce 1.2s ${i * 0.15}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

export default function BarreauEnergiesChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Bienvenue chez Barreau Energies ! Besoin d'un devis, d'un dépannage ou d'un conseil ? Je vous aide à trouver rapidement la solution adaptée à votre besoin.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState("idle"); // idle | sending | sent | error
  const [leadError, setLeadError] = useState("");
  const [honeypot, setHoneypot] = useState(""); // piège à bots : doit rester vide

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen, showLeadForm, leadStatus]);

  const sendMessage = async (text) => {
    const userMsg = { role: "user", content: text };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Réponse vide");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Je n'arrive pas à répondre pour le moment. Vous pouvez nous joindre directement au ${PHONE_DISPLAY} ou laisser vos coordonnées ci-dessous.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
  };

  const buildTranscript = () =>
    messages
      .map((m) => `${m.role === "user" ? "Visiteur" : "Assistant"} : ${m.content}`)
      .join("\n");

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadName.trim() || (!leadPhone.trim() && !leadEmail.trim())) return;

    // Si le honeypot est rempli, c'est un bot : on simule un succès sans rien envoyer.
    if (honeypot) {
      setLeadStatus("sent");
      return;
    }

    setLeadStatus("sending");
    setLeadError("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nom: leadName,
          telephone: leadPhone,
          email: leadEmail,
          _subject: "Nouvelle demande qualifiée — chatbot Barreau Énergies",
          conversation: buildTranscript(),
        }),
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch (_) {
        // réponse non JSON, on ignore
      }

      if (response.ok) {
        setLeadStatus("sent");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Merci ${leadName.split(" ")[0] || ""}, votre demande a bien été transmise. Nous vous recontactons dans les meilleurs délais. Pour une urgence, appelez directement le ${PHONE_DISPLAY}.`,
          },
        ]);
      } else {
        // Formspree renvoie généralement { errors: [{ message, field }] }
        const detail =
          payload && payload.errors && payload.errors.length
            ? payload.errors.map((er) => er.message).join(" — ")
            : `Code ${response.status}`;
        setLeadError(detail);
        setLeadStatus("error");
        console.error("Formspree error:", response.status, payload);
      }
    } catch (err) {
      setLeadError("Connexion impossible (réseau ou blocage navigateur).");
      setLeadStatus("error");
      console.error("Formspree fetch failed:", err);
    }
  };

  const canShowLeadButton = messages.filter((m) => m.role === "user").length >= 1 && !showLeadForm && leadStatus !== "sent";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{FONTS}</style>
      <style>{`
        @keyframes be-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes be-pulse-line {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes be-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes be-panel-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .be-scroll::-webkit-scrollbar { width: 6px; }
        .be-scroll::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 4px; }
        .be-chip:hover { border-color: ${COLORS.copper} !important; color: ${COLORS.copperSoft} !important; }
        .be-launcher:hover { transform: scale(1.05); }
        .be-send:hover { opacity: 0.85; }
        .be-input:focus { outline: none; border-color: ${COLORS.teal} !important; }
        .be-lead-btn:hover { background: ${COLORS.surfaceLight} !important; }
        .be-lead-submit:hover { opacity: 0.85; }

        /* Positionnement : au-dessus de la barre d'appel sticky mobile (StickyCallBar, ~64px), pleine position habituelle au-delà du breakpoint lg. */
        .be-launcher-pos { position: fixed; right: 20px; bottom: 84px; }
        .be-panel-pos { position: fixed; right: 12px; bottom: 80px; }
        @media (min-width: 1024px) {
          .be-launcher-pos { right: 28px; bottom: 28px; }
          .be-panel-pos { right: 24px; bottom: 24px; }
        }
      `}</style>

      {/* Launcher */}
      {!isOpen && (
        <button
          className="be-launcher be-launcher-pos"
          onClick={() => setIsOpen(true)}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            background: `linear-gradient(135deg, ${COLORS.copper}, ${COLORS.teal})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            transition: "transform 0.2s ease",
            zIndex: 45,
          }}
          aria-label="Ouvrir le chat"
        >
          <MessageCircle size={24} color="#10151A" strokeWidth={2.2} />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          className="be-panel-pos"
          style={{
            width: 360,
            maxWidth: "calc(100vw - 32px)",
            height: 560,
            maxHeight: "calc(100vh - 48px)",
            background: COLORS.surface,
            borderRadius: 16,
            border: `1px solid ${COLORS.border}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            animation: "be-panel-in 0.25s ease",
            zIndex: 45,
          }}
        >
          {/* Gradient signature line */}
          <div
            style={{
              height: 3,
              width: "100%",
              flexShrink: 0,
              background: `linear-gradient(90deg, ${COLORS.copper}, ${COLORS.teal}, ${COLORS.copper})`,
              backgroundSize: "200% 100%",
              animation: "be-pulse-line 4s linear infinite",
            }}
          />

          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${COLORS.border}`,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: COLORS.surfaceLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Flame size={15} color={COLORS.copperSoft} style={{ position: "absolute", left: 6, top: 8 }} />
                <Snowflake size={13} color={COLORS.tealSoft} style={{ position: "absolute", right: 6, bottom: 7 }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: COLORS.text }}>
                  Barreau Énergies
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: COLORS.muted }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5FBF7E", display: "inline-block" }} />
                  Assistant en ligne
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <a
                href={`tel:${PHONE_TEL}`}
                title={`Appeler le ${PHONE_DISPLAY}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 9px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.copperSoft,
                  textDecoration: "none",
                  fontSize: 11.5,
                  fontFamily: "'IBM Plex Mono', monospace",
                  whiteSpace: "nowrap",
                }}
              >
                <Phone size={12} /> {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL_DISPLAY}`}
                title={`Écrire à ${EMAIL_DISPLAY}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.tealSoft,
                  textDecoration: "none",
                }}
              >
                <Mail size={14} />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted, padding: 4 }}
                aria-label="Fermer le chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="be-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "84%",
                  animation: "be-fade-in 0.25s ease",
                }}
              >
                <div
                  style={{
                    background: m.role === "user" ? COLORS.copper : COLORS.surfaceLight,
                    color: m.role === "user" ? "#1A1108" : COLORS.text,
                    padding: "10px 13px",
                    borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    border: m.role === "user" ? "none" : `1px solid ${COLORS.border}`,
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: "flex-start", background: COLORS.surfaceLight, borderRadius: "12px 12px 12px 3px", border: `1px solid ${COLORS.border}` }}>
                <TypingDots />
              </div>
            )}

            {messages.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="be-chip"
                    onClick={() => sendMessage(s)}
                    style={{
                      fontSize: 12,
                      padding: "6px 10px",
                      borderRadius: 20,
                      background: "transparent",
                      border: `1px solid ${COLORS.border}`,
                      color: COLORS.muted,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Lead capture trigger */}
            {canShowLeadButton && (
              <button
                className="be-lead-btn"
                onClick={() => setShowLeadForm(true)}
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 2,
                  padding: "8px 12px",
                  borderRadius: 10,
                  background: "transparent",
                  border: `1px dashed ${COLORS.teal}`,
                  color: COLORS.tealSoft,
                  fontSize: 12.5,
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
              >
                <Phone size={13} /> Être recontacté par un technicien
              </button>
            )}

            {/* Inline lead form */}
            {showLeadForm && leadStatus !== "sent" && (
              <form
                onSubmit={handleLeadSubmit}
                style={{
                  background: COLORS.surfaceLight,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  animation: "be-fade-in 0.2s ease",
                }}
              >
                <div style={{ fontSize: 12.5, color: COLORS.text, fontWeight: 600 }}>
                  Vos coordonnées pour être rappelé(e)
                </div>
                {/* Honeypot anti-spam : invisible pour un humain, rempli par les bots */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                  aria-hidden="true"
                />
                <input
                  className="be-input"
                  placeholder="Nom et prénom"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  style={{
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    padding: "8px 10px",
                    color: COLORS.text,
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
                <input
                  className="be-input"
                  placeholder="Téléphone"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  style={{
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    padding: "8px 10px",
                    color: COLORS.text,
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
                <input
                  className="be-input"
                  placeholder="Email (facultatif)"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  style={{
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    padding: "8px 10px",
                    color: COLORS.text,
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
                <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                  <button
                    type="submit"
                    className="be-lead-submit"
                    disabled={leadStatus === "sending" || !leadName.trim() || (!leadPhone.trim() && !leadEmail.trim())}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: 8,
                      border: "none",
                      background: `linear-gradient(135deg, ${COLORS.copper}, ${COLORS.teal})`,
                      color: "#10151A",
                      fontWeight: 600,
                      fontSize: 12.5,
                      cursor: "pointer",
                      opacity: leadStatus === "sending" ? 0.6 : 1,
                    }}
                  >
                    {leadStatus === "sending" ? "Envoi…" : "Envoyer ma demande"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    style={{
                      padding: "9px 12px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.border}`,
                      background: "transparent",
                      color: COLORS.muted,
                      fontSize: 12.5,
                      cursor: "pointer",
                    }}
                  >
                    Annuler
                  </button>
                </div>
                {leadStatus === "error" && (
                  <div style={{ fontSize: 11.5, color: COLORS.copperSoft, lineHeight: 1.5 }}>
                    L'envoi a échoué{leadError ? ` : ${leadError}` : ""}.
                    <br />
                    Vous pouvez nous joindre directement au{" "}
                    <a href={`tel:${PHONE_TEL}`} style={{ color: COLORS.tealSoft }}>
                      {PHONE_DISPLAY}
                    </a>
                    .
                  </div>
                )}
              </form>
            )}

            {leadStatus === "sent" && (
              <div
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: COLORS.tealSoft,
                }}
              >
                <CheckCircle2 size={14} /> Demande transmise
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, padding: 12, borderTop: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
            <input
              className="be-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message…"
              style={{
                flex: 1,
                background: COLORS.surfaceLight,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: COLORS.text,
                fontSize: 13.5,
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <button
              type="submit"
              className="be-send"
              disabled={isLoading || !input.trim()}
              style={{
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: 10,
                border: "none",
                background: `linear-gradient(135deg, ${COLORS.copper}, ${COLORS.teal})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isLoading || !input.trim() ? "default" : "pointer",
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                transition: "opacity 0.15s ease",
              }}
              aria-label="Envoyer"
            >
              {isLoading ? <Loader2 size={16} color="#10151A" className="animate-spin" /> : <Send size={16} color="#10151A" />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
