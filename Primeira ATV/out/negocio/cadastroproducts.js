"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const product_1 = __importDefault(require("../modelo/product"));
const cadastro_1 = __importDefault(require("./cadastro"));
class CadastroProduto extends cadastro_1.default {
    constructor(produtos) {
        super();
        this.produtos = produtos;
        this.entrada = new entrada_1.default();
    }
    cadastrar() {
        console.log(`\n=== Início do Cadastro de Produtos ===\n`);
        const idprod = CadastroProduto.idCounter++;
        const nomeprod = this.entrada.receberTexto(`Por favor, informe o nome do produto:`);
        const valorprodInput = this.entrada.receberNumero(`Por favor, informe o valor do produto:`);
        const valorprod = Number(valorprodInput);
        if (isNaN(valorprod)) {
            console.error("Erro: Valor inválido. Por favor, insira um número válido.");
            return; // Encerra o método caso o valor seja inválido
        }
        const descricaoprod = this.entrada.receberTexto(`Por favor, insira uma breve descrição do produto:`);
        const tipoprod = this.entrada.receberTexto(`Por favor, informe o tipo do produto:`);
        // Criação do objeto Produto e adição à lista de produtos
        const produto = new product_1.default(idprod, nomeprod, valorprod, descricaoprod, tipoprod);
        this.produtos.push(produto);
        console.log(`\nCadastro concluído com sucesso! ID do produto: ${idprod}\n`);
    }
}
CadastroProduto.idCounter = 1;
exports.default = CadastroProduto;
