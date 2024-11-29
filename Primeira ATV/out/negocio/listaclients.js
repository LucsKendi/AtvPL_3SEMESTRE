"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../modelo/client"));
const compra_1 = __importDefault(require("../modelo/compra"));
const cpf_1 = __importDefault(require("../modelo/cpf"));
const pets_1 = __importDefault(require("../modelo/pets"));
const rg_1 = __importDefault(require("../modelo/rg"));
const telefone_1 = __importDefault(require("../modelo/telefone"));
const lists_1 = __importDefault(require("./lists"));
const fs = __importStar(require("fs"));
class ListagemClientes extends lists_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.carregarClientesPredefinidos();
    }
    carregarClientesPredefinidos() {
        const dadosPredefinidos = JSON.parse(fs.readFileSync('src/modelo/clientepet.json', 'utf-8'));
        dadosPredefinidos.clientes.forEach((clienteData) => {
            const compras = clienteData.compras.map((compra) => new compra_1.default(clienteData.cpf.numero, compra.itemId, compra.tipoItem));
            const pets = clienteData.pets.map((petData) => new pets_1.default(petData.nome, petData.raca, petData.genero, petData.tipo));
            const cliente = new client_1.default(clienteData.nome, clienteData.nomeSocial, clienteData.email, new cpf_1.default(clienteData.cpf.numero, clienteData.cpf.dataEmissao), // Criando a instância de CPF
            new telefone_1.default(clienteData.telefone.ddd, clienteData.telefone.numero), // Criando a instância de Telefone
            pets, new rg_1.default(clienteData.rg.numero, clienteData.rg.dataEmissao), // Criando a instância de RG
            compras);
            this.clientes.push(cliente);
        });
    }
    listar() {
        console.log(`\nLista de todos os clientes e seus pets:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            if (cliente.nomeSocial && cliente.nomeSocial.trim() !== "") {
                console.log(`Nome social: ` + cliente.nomeSocial);
            }
            console.log(`Email:` + cliente.email);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log(`RG:` + cliente.getRgs.getValorrg);
            // eslint-disable-next-line no-useless-concat
            console.log(`Telefone:` + '(', cliente.getTelefones.getDdd, ')' + cliente.getTelefones.getNumero);
            if (cliente.getPets.length > 0) {
                console.log(`Pets:`);
                cliente.getPets.forEach((pet, index) => {
                    console.log(`  ${index + 1}. Nome do pet: ${pet.getNome}, Tipo: ${pet.getTipo}, Raça: ${pet.getRaca}, Gênero: ${pet.getGenero}`);
                });
            }
            else {
                console.log(`Este cliente não possui pets.`);
            }
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
exports.default = ListagemClientes;
