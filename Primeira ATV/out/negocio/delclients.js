"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const del_1 = __importDefault(require("./del"));
const entrada_1 = __importDefault(require("../io/entrada"));
class DeletarCliente extends del_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    deleta() {
        console.log(`\nInício da exclusão do cliente`);
        let cpfDeletar = this.entrada.receberTexto(`Por favor informe o número do CPF do cliente que deseja excluir: `);
        let indiceCliente = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpfDeletar);
        if (indiceCliente !== -1) {
            this.clientes.splice(indiceCliente, 1);
            console.log(`\nCliente com CPF ${cpfDeletar} excluído com sucesso!\n`);
        }
        else {
            console.log(`\nCliente com CPF ${cpfDeletar} não encontrado.\n`);
        }
    }
}
exports.default = DeletarCliente;
