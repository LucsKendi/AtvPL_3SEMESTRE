"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const cadastro_1 = __importDefault(require("./cadastro"));
const servicos_1 = __importDefault(require("../modelo/servicos"));
class CadastroServico extends cadastro_1.default {
    constructor(servico) {
        super();
        this.servico = servico;
        this.entrada = new entrada_1.default();
    }
    cadastrar() {
        console.log(`\n Iníco do cadastro de Serviços`);
        let idserv = CadastroServico.idCounter++;
        let nomeserv = this.entrada.receberTexto(`Por favor informe o nome do serviço:`);
        let valorprodInput = this.entrada.receberNumero(`Por favor informe o valor do produto:`);
        let valorserv = Number(valorprodInput); // Convert to number
        if (isNaN(valorserv)) {
            console.error("Valor inválido, não é um número.");
            return; // Exit the method if the value is not valid
        }
        let descricaoserv = this.entrada.receberTexto(`Por favor coloque uma breve descrição do serviço:`);
        let tiposerv = this.entrada.receberTexto(`Por favor informe o tipo do serviço:`);
        let servico = new servicos_1.default(idserv, nomeserv, valorserv, descricaoserv, tiposerv);
        this.servico.push(servico);
        console.log(`\nCadastro concluído,ID do produto: ${idserv}\n`);
    }
}
CadastroServico.idCounter = 1;
exports.default = CadastroServico;
