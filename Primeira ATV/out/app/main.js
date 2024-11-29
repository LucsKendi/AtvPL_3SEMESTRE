"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const empresas_1 = __importDefault(require("../modelo/empresas"));
const cadastroclients_1 = __importDefault(require("../negocio/cadastroclients"));
const listaclients_1 = __importDefault(require("../negocio/listaclients"));
const delclients_1 = __importDefault(require("../negocio/delclients"));
const atualizacliente_1 = __importDefault(require("../negocio/atualizacliente"));
const cadastroproducts_1 = __importDefault(require("../negocio/cadastroproducts"));
const cadastroservices_1 = __importDefault(require("../negocio/cadastroservices"));
const listaproducts_1 = __importDefault(require("../negocio/listaproducts"));
const listaservices_1 = __importDefault(require("../negocio/listaservices"));
const atualizaproducts_1 = __importDefault(require("../negocio/atualizaproducts"));
const atualizaservices_1 = __importDefault(require("../negocio/atualizaservices"));
const delproducts_1 = __importDefault(require("../negocio/delproducts"));
const delservices_1 = __importDefault(require("../negocio/delservices"));
const cadastroboughts_1 = __importDefault(require("../negocio/cadastroboughts"));
const listaboughts_1 = __importDefault(require("../negocio/listaboughts"));
console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`);
let empresa = new empresas_1.default();
let execucao = true;
let entrada = new entrada_1.default();
while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastro de Clientes`);
    console.log(`2 - Cadastro de Produtos/Serviços`);
    console.log(`3 - Consumo de Clientes`);
    console.log(`0 - Sair`);
    let opcao = entrada.receberNumero(`Por favor,escolha uma opção:`);
    switch (opcao) {
        case 1:
            let operacaoCliente = true;
            while (operacaoCliente) {
                console.log(`Opções:`);
                console.log(`1 - Cadastrar cliente`);
                console.log(`2 - Listar todos os clientes`);
                console.log(`3 - Excluir Cliente`);
                console.log(`4 - Atualizar Cliente`);
                console.log(`0 - Sair para o menu principal`);
                let escolha = entrada.receberNumero(`Por favor, escolha uma opção: `);
                switch (escolha) {
                    case 1:
                        let cadastro = new cadastroclients_1.default(empresa.getClientes);
                        cadastro.cadastrar();
                        break;
                    case 2:
                        let listagem = new listaclients_1.default(empresa.getClientes);
                        listagem.listar();
                        break;
                    case 3:
                        let deletar = new delclients_1.default(empresa.getClientes);
                        deletar.deleta();
                        break;
                    case 4:
                        let atualizar = new atualizacliente_1.default(empresa.getClientes);
                        atualizar.atualizar();
                        break;
                    case 0:
                        operacaoCliente = false;
                        break;
                    default:
                        console.log(`Operação não entendida :`);
                }
            }
            break;
        case 2:
            let operacaoProduto = true;
            while (operacaoProduto) {
                console.log(`Opções:`);
                console.log(`1-Cadastrar Produtos ou Serviços`);
                console.log(`2-Listar Produtos e Serviços`);
                console.log(`3-Atualizar Produtos ou Serviços`);
                console.log(`4-Deletar Produtos ou Serviços`);
                console.log(`0-Sair`);
                let escolhaProduto = entrada.receberNumero(`Por favor,escolha um opção:`);
                switch (escolhaProduto) {
                    case 1:
                        let cadastrarprod = true;
                        while (cadastrarprod) {
                            console.log(`Opções:`);
                            console.log(`1-Produto`);
                            console.log(`2-Serviço`);
                            console.log(`0-Sair`);
                            let escolhacadastprod = entrada.receberNumero(`Escolha Produto ou Serviço:`);
                            switch (escolhacadastprod) {
                                case 1:
                                    let cadastroprod = new cadastroproducts_1.default(empresa.getProdutos);
                                    cadastroprod.cadastrar();
                                    break;
                                case 2:
                                    let cadastroserv = new cadastroservices_1.default(empresa.getServicos);
                                    cadastroserv.cadastrar();
                                    break;
                                case 0:
                                    cadastrarprod = false;
                                    break;
                                default:
                                    console.log(`Operação não entendida`);
                            }
                        }
                        break;
                    case 2:
                        let listopc = true;
                        while (listopc) {
                            console.log(`Opções:`);
                            console.log(`1-Produto`);
                            console.log(`2-Serviço`);
                            console.log(`0-Sair`);
                            let escolhacadastprod = entrada.receberNumero(`Escolha Produto ou Serviço:`);
                            switch (escolhacadastprod) {
                                case 1:
                                    let listprod = new listaproducts_1.default(empresa.getProdutos);
                                    listprod.listar();
                                    break;
                                case 2:
                                    let listserv = new listaservices_1.default(empresa.getServicos);
                                    listserv.listar();
                                    break;
                                case 0:
                                    listopc = false;
                                    break;
                                default:
                                    console.log(`Operação não entendida`);
                            }
                        }
                        break;
                    case 3:
                        let attopc = true;
                        while (attopc) {
                            console.log(`Opções:`);
                            console.log(`1-Produto`);
                            console.log(`2-Serviço`);
                            console.log(`0-Sair`);
                            let escolhacadastprod = entrada.receberNumero(`Escolha Produto ou Serviço:`);
                            switch (escolhacadastprod) {
                                case 1:
                                    let attprod = new atualizaproducts_1.default(empresa.getProdutos);
                                    attprod.atualizar();
                                    break;
                                case 2:
                                    let attserv = new atualizaservices_1.default(empresa.getServicos);
                                    attserv.atualizar();
                                    break;
                                case 0:
                                    attopc = false;
                                    break;
                                default:
                                    console.log(`Operação não entendida`);
                            }
                        }
                        break;
                    case 4:
                        let delopc = true;
                        while (delopc) {
                            console.log(`Opções:`);
                            console.log(`1-Produto`);
                            console.log(`2-Serviço`);
                            console.log(`0-Sair`);
                            let escolhacadastprod = entrada.receberNumero(`Escolha Produto ou Serviço:`);
                            switch (escolhacadastprod) {
                                case 1:
                                    let delprod = new delproducts_1.default(empresa.getProdutos);
                                    delprod.deleta();
                                    break;
                                case 2:
                                    let delserv = new delservices_1.default(empresa.getServicos);
                                    delserv.deleta();
                                    break;
                                case 0:
                                    delopc = false;
                                    break;
                                default:
                                    console.log(`Operação não entendida`);
                            }
                        }
                        break;
                    case 0:
                        operacaoProduto = false;
                        break;
                    default:
                        console.log(`Operação não entendida`);
                }
            }
            break;
        case 3:
            let consumoCliente = true;
            while (consumoCliente) {
                console.log(`Opções:`);
                console.log(`1-Cadastrar Compra de Produto ou Serviço`);
                console.log(`2-Ver Compras`);
                console.log(`3-Ver Listas`);
                console.log(`0-Sair para o menu principal`);
                let escolhaConsumo = entrada.receberNumero(`Por favor,escolha uma opção:`);
                switch (escolhaConsumo) {
                    case 1:
                        let cadastrarCompra = new cadastroboughts_1.default(empresa);
                        cadastrarCompra.cadastrarCompra();
                        break;
                    case 2:
                        let listarCompra = new listaboughts_1.default(empresa.getClientes, empresa);
                        listarCompra.listarCompra();
                        break;
                    case 3:
                        let listarOpcoes = new listaboughts_1.default(empresa.getClientes, empresa);
                        let verListagens = true;
                        while (verListagens) {
                            console.log(`Opções:`);
                            console.log(`1 - Top 10 Clientes por Quantidade`);
                            console.log(`2 - Serviços ou Produtos mais Consumidos`);
                            console.log(`3 - Serviços ou Produtos mais Consumidos por Tipo de Pet`);
                            console.log(`4 - Serviços ou Produtos mais Consumidos por Raça de Pet`);
                            console.log(`5 - Top 5 Clientes por Valor Consumido`);
                            console.log(`0 - Voltar`);
                            let escolhaListagem = entrada.receberNumero(`Por favor, escolha uma opção: `);
                            switch (escolhaListagem) {
                                case 1:
                                    listarOpcoes.listarTop10ClientesPorQuantidade();
                                    break;
                                case 2:
                                    listarOpcoes.listarMaisConsumidos();
                                    break;
                                case 3:
                                    listarOpcoes.listarPorTipo();
                                    break;
                                case 4:
                                    listarOpcoes.listarPorRaca();
                                    break;
                                case 5:
                                    listarOpcoes.listarTop5ClientesPorCompras();
                                    break;
                                case 0:
                                    verListagens = false;
                                    break;
                                default:
                                    console.log(`Operação não entendida:`);
                            }
                        }
                        break;
                    case 0:
                        consumoCliente = false;
                        break;
                    default:
                        console.log(`Operação não entendida:`);
                }
            }
            break;
        case 0:
            execucao = false;
            console.log(`Até Mais`);
            break;
        default:
            console.log(`Opção não reconhecida `);
    }
}
