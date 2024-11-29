import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaCliente from "./listaCliente";
import CadastroPage from "./navigatetocadastros"; // Importando a página de cadastro de produtos/serviços
import ListaProdutosServicos from "./listaprodeserv";
import CadastroCompra from "./cadastrocompra";
import Listas from "./listas";

type Cliente = {
    nome: string;
    nomeSocial: string;
    categoriaNomeSocial: string;
    email: string;
    pet: Array<any>; // Defina o tipo correto de Pet aqui
    nomepet: string;
    tipo: string;
    raca: string;
    genero: string;
    telefone: any; // Defina o tipo correto de Telefone aqui
    telefoneCompleto: string;
    rg: any; // Defina o tipo correto de RG aqui
    dataEmissaoRG: string;
    cpf: any; // Defina o tipo correto de CPF aqui
    dataEmissaoCpf: string;
    dataCadastro: Date;
    compras: Array<any>; // Defina o tipo correto de Compra aqui
    cadastroConcluido: boolean;
    erros: { [key: string]: string };
};

const Roteador = () => {
    const [tela, setTela] = useState<string>("Clientes"); // Tela inicial
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const selecionarView = (novaTela: string) => {
        setTela(novaTela);
    };

    const barraNavegacao = (
        <BarraNavegacao
            seletorView={selecionarView}
            tema="#ADD8E6"
            botoes={[
                "Cadastro de Clientes",
                "Clientes",
                "Cadastro de Produtos/Serviços",
                "Produtos e Serviços",
                "Cadastrar Compras",
                "Estatísticas",
            ]}
        />
    );

    if (tela === "Clientes") {
        return (
            <>
                {barraNavegacao}
                <ListaCliente tema="#ADD8E6" />
            </>
        );
    }

    if (tela === "Cadastro de Clientes") {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastroCliente
                    tema="#ADD8E6"
                    cadastrarCliente={(clienteData) => {
                        console.log(clienteData); // Aqui você pode processar o cadastro
                    }}
                />
            </>
        );
    }

    if (tela === "Cadastro de Produtos/Serviços") {
        return (
            <>
                {barraNavegacao}
                <CadastroPage tema="#ADD8E6" />
            </>
        );
    }

    if (tela === "Produtos e Serviços") {
        return (
            <>
                {barraNavegacao}
                <ListaProdutosServicos tema="#ADD8E6" />
            </>
        );
    }

    if (tela === "Cadastrar Compras") {
        return (
            <>
                {barraNavegacao}
                <CadastroCompra tema="#ADD8E6" />
            </>
        );
    }

    if (tela === "Estatísticas") {
        return (
            <>
                {barraNavegacao}
                <Listas tema="#ADD8E6" />
            </>
        );
    }

    return null;
};

export default Roteador;
