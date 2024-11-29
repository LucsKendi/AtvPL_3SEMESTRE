"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const client_1 = __importDefault(require("../modelo/client"));
const cpf_1 = __importDefault(require("../modelo/cpf"));
const cadastro_1 = __importDefault(require("./cadastro"));
const pets_1 = __importDefault(require("../modelo/pets"));
const telefone_1 = __importDefault(require("../modelo/telefone"));
const rg_1 = __importDefault(require("../modelo/rg"));
class CadastroCliente extends cadastro_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    stringParaData(dataString) {
        const [dia, mes, ano] = dataString.split("/").map(Number);
        return new Date(ano, mes - 1, dia); // Meses são indexados de 0 a 11
    }
    cadastrar() {
        console.log(`\nInício do cadastro do cliente`);
        const nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        const desejaNomeSocial = this.entrada.receberTexto(`Deseja informar o nome social? (S/N): `).toLowerCase();
        const nomeSocial = desejaNomeSocial === 's'
            ? this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
            : "";
        const email = this.entrada.receberTexto(`Por favor informe o email do cliente: `);
        const cpfValor = this.entrada.receberTexto(`Por favor informe o número do CPF: `);
        // Verificação de CPF já cadastrado
        if (this.clientes.some(cliente => cliente.getCpf.getValor === cpfValor)) {
            console.log(`\nErro: O CPF informado já está cadastrado.\n`);
            return;
        }
        const dataCpfString = this.entrada.receberTexto(`Por favor informe a data de emissão do CPF (dd/mm/yyyy): `);
        const dataCpf = this.stringParaData(dataCpfString);
        const rgValor = this.entrada.receberTexto(`Por favor informe o número do RG: `);
        const dataRgString = this.entrada.receberTexto(`Por favor informe a data de emissão do RG (dd/mm/yyyy): `);
        const dataRg = this.stringParaData(dataRgString);
        const ddd = this.entrada.receberTexto(`Coloque o DDD do telefone do cliente: `);
        const numero = this.entrada.receberTexto(`Coloque o número do telefone do cliente: `);
        const telefone = new telefone_1.default(ddd, numero);
        const cpf = new cpf_1.default(cpfValor, dataCpf);
        const rg = new rg_1.default(rgValor, dataRg);
        const compras = [];
        // Cadastro de Pets
        const pets = [];
        let cadastrarMaisPets;
        do {
            const nomePet = this.entrada.receberTexto(`Por favor informe o nome do pet: `);
            const tipo = this.entrada.receberTexto(`Por favor informe o tipo do pet: `);
            const raca = this.entrada.receberTexto(`Por favor informe a raça do pet: `);
            const genero = this.entrada.receberTexto(`Por favor informe o gênero do pet: `);
            pets.push(new pets_1.default(nomePet, raca, genero, tipo));
            const maisPets = this.entrada.receberTexto(`Deseja cadastrar mais um pet? (S/N): `).toLowerCase();
            cadastrarMaisPets = maisPets === 's';
        } while (cadastrarMaisPets);
        // Criação e Adição do Cliente
        const cliente = new client_1.default(nome, nomeSocial, email, cpf, telefone, pets, rg, compras);
        this.clientes.push(cliente);
        console.log(`\nCadastro concluído com sucesso! :)`);
    }
}
exports.default = CadastroCliente;
