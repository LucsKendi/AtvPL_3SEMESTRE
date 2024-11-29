"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const compra_1 = __importDefault(require("../modelo/compra"));
class CadastroCompra {
    constructor(empresa) {
        this.empresa = empresa;
        this.entrada = new entrada_1.default();
    }
    cadastrarCompra() {
        console.log(`\nInício do cadastro de compra.`);
        const cpfCliente = this.entrada.receberTexto(`Informe o CPF do cliente: `);
        const cliente = this.empresa.getClientes.find(cliente => cliente.getCpf.getValor === cpfCliente);
        if (!cliente) {
            console.log(`\nErro: Cliente com CPF ${cpfCliente} não encontrado.`);
            return;
        }
        console.log(`\nCliente encontrado: ${cliente.nome}\n`);
        const opcaoItem = this.entrada.receberNumero(`Deseja comprar um Produto (1) ou um Serviço (2)? `);
        switch (opcaoItem) {
            case 1:
                this.cadastrarProduto(cliente);
                break;
            case 2:
                this.cadastrarServico(cliente);
                break;
            default:
                console.log(`\nErro: Opção inválida. Por favor, escolha 1 para Produto ou 2 para Serviço.`);
        }
    }
    cadastrarProduto(cliente) {
        console.log(`\nProdutos disponíveis:`);
        this.empresa.getProdutos.forEach(produto => {
            console.log(`ID: ${produto.getIdProduto} - Nome: ${produto.nomeprod} - Valor: ${produto.valorprod}`);
        });
        const idProduto = this.entrada.receberNumero(`Informe o ID do produto desejado: `);
        const produto = this.empresa.getProdutos.find(produto => produto.getIdProduto === idProduto);
        if (!produto) {
            console.log(`\nErro: Produto com ID ${idProduto} não encontrado.`);
            return;
        }
        const novaCompra = new compra_1.default(cliente.getCpf.getValor, produto.getIdProduto, 'produto');
        cliente.adicionarCompra(novaCompra);
        console.log(`\nCompra registrada com sucesso! Produto: ${produto.nomeprod}`);
    }
    cadastrarServico(cliente) {
        console.log(`\nServiços disponíveis:`);
        this.empresa.getServicos.forEach(servico => {
            console.log(`ID: ${servico.getIdServico} - Nome: ${servico.nomesserv} - Valor: ${servico.valorserv}`);
        });
        const idServico = this.entrada.receberNumero(`Informe o ID do serviço desejado: `);
        const servico = this.empresa.getServicos.find(servico => servico.getIdServico === idServico);
        if (!servico) {
            console.log(`\nErro: Serviço com ID ${idServico} não encontrado.`);
            return;
        }
        const novaCompra = new compra_1.default(cliente.getCpf.getValor, servico.getIdServico, 'servico');
        cliente.adicionarCompra(novaCompra);
        console.log(`\nCompra registrada com sucesso! Serviço: ${servico.nomesserv}`);
    }
}
exports.default = CadastroCompra;
