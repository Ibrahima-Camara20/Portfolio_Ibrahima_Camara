import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-dark text-white text-center py-4 mt-5">
            <div className="container">
                <p>© 2026 Ibrahima Camara - Portfolio. {t("footer.rights")}</p>
            </div>
        </footer>
    );
}

export default Footer;
