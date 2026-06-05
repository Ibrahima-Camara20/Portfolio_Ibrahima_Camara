import React from "react";

function PageHero({ title, subtitle }) {
    return (
        <div style={heroStyle}>
            <div style={{ ...blob, top: "-100px", right: "-60px", width: 340, height: 340, background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)" }} />
            <div style={{ ...blob, bottom: "-60px", left: "3%", width: 260, height: 260, background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />
            <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <h1 style={{ color: "white", fontSize: "clamp(1.85rem, 4vw, 2.6rem)", fontWeight: 800, margin: 0 }}>
                    {title}
                </h1>
                {subtitle && (
                    <p style={{ color: "rgba(255,255,255,0.58)", margin: "0.75rem 0 0", fontSize: "1rem" }}>
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}

const heroStyle = {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
    padding: "3.75rem 0 3.25rem",
    position: "relative",
    overflow: "hidden",
};

const blob = {
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
};

export default PageHero;
