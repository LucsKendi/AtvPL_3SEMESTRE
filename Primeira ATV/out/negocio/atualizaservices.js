"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const atualiza_1 = __importDefault(require("./atualiza"));
class AtualizarServico extends atualiza_1.default {
    constructor(servicos) {
        super();
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    atualizar() {
        console.log(`\nIniciando o processo de atualização de serviços.`);
        const idAtualizar = this.entrada.receberNumero(`Informe o ID do serviço que deseja atualizar: `);
        const servicoEncontrado = this.servicos.find(servico => servico.getIdServico === idAtualizar);
        if (servicoEncontrado) {
            console.log(`\nServiço encontrado! Insira as novas informações ou pressione Enter para manter os dados atuais.\n`);
            const novoNome = this.entrada.receberTexto(`Novo nome do serviço: `);
            const novoValorInput = this.entrada.receberTexto(`Novo valor do serviço: `);
            const novoValor = novoValorInput ? Number(novoValorInput) : undefined;
            if (novoValorInput && isNaN(novoValor)) {
                console.error("\nErro: O valor informado não é válido. Por favor, insira um número.");
                return;
            }
            const novaDescricao = this.entrada.receberTexto(`Nova descrição do serviço: `);
            const novoTipo = this.entrada.receberTexto(`Novo tipo do serviço: `);
            // Atualizando os dados do serviço
            if (novoNome)
                servicoEncontrado.nomesserv = novoNome;
            if (novoValor !== undefined)
                servicoEncontrado.valorserv = novoValor;
            if (novaDescricao)
                servicoEncontrado.descricaoserv = novaDescricao;
            if (novoTipo)
                servicoEncontrado.tiposerv = novoTipo;
            console.log(`\nAs informações do serviço foram atualizadas com sucesso!\n`);
        }
        else {
            console.log(`\nNenhum serviço com o ID ${idAtualizar} foi encontrado. Por favor, tente novamente.\n`);
        }
    }
}
exports.default = AtualizarServico;
