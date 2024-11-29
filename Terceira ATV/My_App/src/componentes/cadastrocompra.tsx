import React, { useState, useEffect } from "react";
import { insertMaskInCpf } from "../functions/cpf";

type Produto = {
    nomeprod: string;
    valorprod: number;
    tipoprod: string;
    descricaoprod: string;
};

type Servico = {
    nomeserv: string;
    valorserv: number;
    tiposerv: string;
    descricaoserv: string;
};

type Compra = {
    clienteCpf: string;
    itemNome: string;
    valorCompra: number;
    tipoItem: "produto" | "servico";
};

type Props = {
    tema: string;
};

const CadastroCompra: React.FC<Props> = ({ tema }) => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [selectedItem, setSelectedItem] = useState<Produto | Servico | null>(null);
    const [cpfCliente, setCpfCliente] = useState<string>("");
    const [tipoItem, setTipoItem] = useState<"produto" | "servico">("produto");

    useEffect(() => {
        const loadStorageData = (key: string) => {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : [];
            } catch (error) {
                console.error(`Erro ao carregar ${key}:`, error);
                return [];
            }
        };

        setProdutos(loadStorageData("produtos"));
        setServicos(loadStorageData("servicos"));
    }, []);

    const isProduto = (item: Produto | Servico): item is Produto =>
        (item as Produto).nomeprod !== undefined;

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCpfCliente(insertMaskInCpf(e.target.value));
    };

    const handleTipoItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoItem(e.target.value as "produto" | "servico");
        setSelectedItem(null); // Limpa a seleção ao mudar o tipo
    };

    const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected =
            tipoItem === "produto"
                ? produtos.find((produto) => produto.nomeprod === e.target.value)
                : servicos.find((servico) => servico.nomeserv === e.target.value);

        setSelectedItem(selected || null);
    };

    const handleCadastrarCompra = () => {
        const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        const clienteExistente = clientes.find(
            (cliente: any) => cliente.cpf.valor === cpfCliente
        );

        if (!clienteExistente) {
            alert("CPF não cadastrado! Registre o cliente antes de realizar a compra.");
            return;
        }

        if (!selectedItem) {
            alert("Por favor, selecione um item.");
            return;
        }

        const novaCompra: Compra = {
            clienteCpf: cpfCliente,
            itemNome: isProduto(selectedItem)
                ? selectedItem.nomeprod
                : selectedItem.nomeserv,
            valorCompra: isProduto(selectedItem)
                ? selectedItem.valorprod
                : selectedItem.valorserv,
            tipoItem,
        };

        clienteExistente.compras.push(novaCompra);

        localStorage.setItem(
            "clientes",
            JSON.stringify(
                clientes.map((cliente: any) =>
                    cliente.cpf.valor === cpfCliente ? clienteExistente : cliente
                )
            )
        );

        alert("Compra registrada com sucesso!");
        resetForm();
    };

    const resetForm = () => {
        setCpfCliente("");
        setSelectedItem(null);
        setTipoItem("produto");
    };

    return (
        <div className="container-fluid" style={{ backgroundColor: tema, padding: "20px" }}>
            <h2>Cadastro de Compra</h2>
            <div className="form-group">
                <label htmlFor="cpfCliente">CPF do Cliente:</label>
                <input
                    type="text"
                    id="cpfCliente"
                    className="form-control"
                    value={cpfCliente}
                    onChange={handleCpfChange}
                    placeholder="Digite o CPF do cliente"
                />
            </div>

            <div className="form-group">
                <label htmlFor="tipoItem">Tipo de Item:</label>
                <select
                    id="tipoItem"
                    className="form-control"
                    value={tipoItem}
                    onChange={handleTipoItemChange}
                >
                    <option value="produto">Produto</option>
                    <option value="servico">Serviço</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="itemSelect">
                    Selecione um {tipoItem === "produto" ? "Produto" : "Serviço"}:
                </label>
                <select
                    id="itemSelect"
                    className="form-control"
                    onChange={handleItemSelect}
                    value={
                        selectedItem
                            ? isProduto(selectedItem)
                                ? selectedItem.nomeprod
                                : selectedItem.nomeserv
                            : ""
                    }
                >
                    <option value="">
                        Selecione um {tipoItem === "produto" ? "produto" : "serviço"}
                    </option>
                    {(tipoItem === "produto" ? produtos : servicos).map((item, index) => (
                        <option
                            key={index}
                            value={isProduto(item) ? item.nomeprod : item.nomeserv}
                        >
                            {isProduto(item) ? item.nomeprod : item.nomeserv}
                        </option>
                    ))}
                </select>
            </div>

            {selectedItem && (
                <div className="item-info mt-3">
                    <h5>{tipoItem === "produto" ? "Produto Selecionado" : "Serviço Selecionado"}</h5>
                    <p><strong>Nome:</strong> {isProduto(selectedItem) ? selectedItem.nomeprod : selectedItem.nomeserv}</p>
                    <p><strong>Valor:</strong> R$ {isProduto(selectedItem) ? selectedItem.valorprod : selectedItem.valorserv}</p>
                    <p><strong>Descrição:</strong> {isProduto(selectedItem) ? selectedItem.descricaoprod : selectedItem.descricaoserv}</p>
                </div>
            )}

            <button className="btn btn-primary mt-3" onClick={handleCadastrarCompra}>
                Cadastrar Compra
            </button>
        </div>
    );
};

export default CadastroCompra;
