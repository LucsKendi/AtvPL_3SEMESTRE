"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const del_1 = __importDefault(require("./del"));
const entrada_1 = __importDefault(require("../io/entrada"));
class DeletarServico extends del_1.default {
    constructor(servico) {
        super();
        this.servico = servico;
        this.entrada = new entrada_1.default();
    }
    deleta() {
        console.log(`\nInício da exclusão do produto`);
        let idDeletar = this.entrada.receberNumero(`Por favor informe o número do ID do serviço que deseja excluir: `);
        let indiceServico = this.servico.findIndex(servico => servico.getIdServico === idDeletar);
        if (indiceServico !== -1) {
            this.servico.splice(indiceServico, 1);
            console.log(`\Serviço com ID ${idDeletar} excluído com sucesso!\n`);
        }
        else {
            console.log(`\Serviço com ID ${idDeletar} não encontrado.\n`);
        }
    }
}
exports.default = DeletarServico;
