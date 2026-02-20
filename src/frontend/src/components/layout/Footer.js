import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const content = {
    fr: { rights: "Tous droits réservés." },
    en: { rights: "All rights reserved." },
};

function Footer() {
    const { language } = useLanguage();
    const t = content[language];
    return (
        <footer className="bg-dark text-white text-center py-4 mt-5">
            <div className="container">
                <p>© 2026 Ibrahima Camara - Portfolio. {t.rights}</p>
            </div>
        </footer>
    );
}

export default Footer;
