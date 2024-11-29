"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const del_1 = __importDefault(require("./del"));
const entrada_1 = __importDefault(require("../io/entrada"));
class DeletarProduto extends del_1.default {
    constructor(produto) {
        super();
        this.produto = produto;
        this.entrada = new entrada_1.default();
    }
    deleta() {
        console.log(`\nInício da exclusão do produto`);
        let idDeletar = this.entrada.receberNumero(`Por favor informe o número do ID do produto que deseja excluir: `);
        let indiceProduto = this.produto.findIndex(produto => produto.getIdProduto === idDeletar);
        if (indiceProduto !== -1) {
            this.produto.splice(indiceProduto, 1);
            console.log(`\Produto com ID ${idDeletar} excluído com sucesso!\n`);
        }
        else {
            console.log(`\Produto com ID ${idDeletar} não encontrado.\n`);
        }
    }
}
exports.default = DeletarProduto;
