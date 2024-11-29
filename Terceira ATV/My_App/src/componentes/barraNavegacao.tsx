/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type BarraNavegacaoProps = {
    tema?: string; // Alterado para opcional
    botoes: string[];
    seletorView: (valor: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const BarraNavegacao: FC<BarraNavegacaoProps> = ({ tema = "#f8f9fa", botoes, seletorView }) => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const gerarListaBotoes = () =>
        botoes.length > 0 ? (
            botoes.map((valor) => (
                <li key={valor} className="nav-item">
                    <a
                        className="nav-link"
                        href="#"
                        onClick={(e) => seletorView(valor, e)}
                    >
                        {valor}
                    </a>
                </li>
            ))
        ) : (
            <li className="nav-item">
                <span className="nav-link disabled">Sem opções</span>
            </li>
        );

    useEffect(() => {
        document.title = `PetLovers - ${botoes[0] || "Home"}`;
    }, [botoes]);

    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: tema,
                marginBottom: 10,
                width: "100%",
            }}
        >
            <div className="container-fluid" style={{padding:'40px'}}>
                <span className="navbar-brand mb-0 h1">PetLovers PL</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={!isNavCollapsed}
                    aria-label="Toggle navigation"
                    onClick={() => setIsNavCollapsed((prev) => !prev)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse ${
                        isNavCollapsed ? "" : "show"
                    }`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav">{gerarListaBotoes()}</ul>
                </div>
                <span className="navbar-brand mb-0 h1">Lista 3</span>
            </div>
        </nav>
    );
};

export default BarraNavegacao;
