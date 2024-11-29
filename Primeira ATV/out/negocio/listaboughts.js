"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const CAMINHO_CLIENTES = 'src/modelo/clientpet.json';
const CAMINHO_PRODUTOS = 'src/modelo/produto.json';
const CAMINHO_SERVIÇOS = 'src/modelo/servico.json';
class ListarCompras {
    constructor(clientes, empresa) {
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
        this.empresa = empresa;
    }
    listarCompra() {
        let cpfValor = this.entrada.receberTexto("Digite o CPF do cliente: ");
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfValor);
        if (cliente) {
            console.log(`Compras feitas por ${cliente.nome}:`);
            let totalCompras = 0;
            if (cliente.getCompras().length > 0) {
                cliente.getCompras().forEach((compra, index) => {
                    let nomeItem = "";
                    let tipoItem = "";
                    let valorItem = 0;
                    if (compra.tipoItem === 'produto') {
                        let produto = this.empresa.getProdutos.find(p => p.getIdProduto === compra.itemId);
                        if (produto) {
                            nomeItem = produto.nomeprod;
                            tipoItem = 'Produto';
                            valorItem = Number(produto.valorprod);
                        }
                    }
                    else if (compra.tipoItem === 'servico') {
                        let servico = this.empresa.getServicos.find(s => s.getIdServico === compra.itemId);
                        if (servico) {
                            nomeItem = servico.nomesserv;
                            tipoItem = 'Serviço';
                            valorItem = Number(servico.valorserv);
                        }
                    }
                    totalCompras += valorItem;
                    console.log(`${index + 1} - ID do Item: ${compra.itemId}, Nome: ${nomeItem}, Tipo: ${tipoItem}, Valor: R$ ${valorItem}`);
                });
                console.log(`Total das compras de ${cliente.nome}: R$${totalCompras.toFixed(2)}`);
            }
            else {
                console.log("Nenhuma compra encontrada para este cliente.");
            }
        }
        else {
            console.log("Cliente não encontrado.");
        }
    }
    listarTop10ClientesPorQuantidade() {
        const clientesComContagem = this.clientes.map(cliente => {
            return {
                cliente,
                quantidade: cliente.getCompras().length,
            };
        });
        const top10 = clientesComContagem
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 10);
        console.log("Top 10 Clientes por Quantidade de Compras:");
        top10.forEach(item => {
            console.log(`${item.cliente.nomeCliente()}: ${item.quantidade} compras`);
        });
    }
    listarMaisConsumidos() {
        const contagem = {};
        this.clientes.forEach(cliente => {
            cliente.getCompras().forEach(compra => {
                let nomeItem;
                let tipoItem = compra.tipoItem;
                if (tipoItem === 'produto') {
                    const produto = this.empresa.getProdutos.find(p => p.getIdProduto === compra.itemId);
                    nomeItem = produto ? produto.nomeprod : 'Produto não encontrado';
                }
                else if (tipoItem === 'servico') {
                    const servico = this.empresa.getServicos.find(s => s.getIdServico === compra.itemId);
                    nomeItem = servico ? servico.nomesserv : 'Serviço não encontrado';
                }
                if (nomeItem) {
                    const key = `${tipoItem}-${compra.itemId}`;
                    if (!contagem[key]) {
                        contagem[key] = { tipo: tipoItem, nome: nomeItem, quantidade: 0 };
                    }
                    contagem[key].quantidade++;
                }
            });
        });
        const maisConsumidos = Object.values(contagem)
            .sort((a, b) => b.quantidade - a.quantidade);
        console.log("Serviços ou Produtos mais Consumidos:");
        maisConsumidos.forEach(item => {
            console.log(`Item: ${item.nome}, Tipo: ${item.tipo}, Quantidade: ${item.quantidade}`);
        });
    }
    listarPorTipo() {
        const contagem = {};
        this.clientes.forEach(cliente => {
            const pets = Array.isArray(cliente.getPets) ? cliente.getPets : [cliente.getPets]; // Garante que pets seja um array
            cliente.getCompras().forEach(compra => {
                // Determine o nome do item e o tipo de item
                let nomeItem;
                const tipoItem = compra.tipoItem;
                if (tipoItem === 'produto') {
                    const produto = this.empresa.getProdutos.find(p => p.getIdProduto === compra.itemId);
                    nomeItem = produto ? produto.nomeprod : 'Produto não encontrado';
                }
                else if (tipoItem === 'servico') {
                    const servico = this.empresa.getServicos.find(s => s.getIdServico === compra.itemId);
                    nomeItem = servico ? servico.nomesserv : 'Serviço não encontrado';
                }
                if (nomeItem) {
                    pets.forEach(pet => {
                        const tipoAnimal = pet.tipo;
                        if (!contagem[tipoAnimal]) {
                            contagem[tipoAnimal] = {};
                        }
                        if (!contagem[tipoAnimal][nomeItem]) {
                            contagem[tipoAnimal][nomeItem] = { quantidade: 0, tipoItem: tipoItem };
                        }
                        contagem[tipoAnimal][nomeItem].quantidade++;
                    });
                }
            });
        });
        // Exibe a contagem no console
        console.log("Contagem de Compras por Tipo de Animal:");
        for (const tipo in contagem) {
            console.log(`Tipo de Animal: ${tipo}`);
            for (const nomeItem in contagem[tipo]) {
                const { quantidade, tipoItem } = contagem[tipo][nomeItem];
                console.log(`  Item: ${nomeItem}, Quantidade: ${quantidade}, Tipo: ${tipoItem}`);
            }
        }
    }
    listarPorRaca() {
        const contagem = {};
        this.clientes.forEach(cliente => {
            const pets = Array.isArray(cliente.getPets) ? cliente.getPets : [cliente.getPets];
            cliente.getCompras().forEach(compra => {
                let nomeItem;
                const tipoItem = compra.tipoItem;
                if (tipoItem === 'produto') {
                    const produto = this.empresa.getProdutos.find(p => p.getIdProduto === compra.itemId);
                    nomeItem = produto ? produto.nomeprod : 'Produto não encontrado';
                }
                else if (tipoItem === 'servico') {
                    const servico = this.empresa.getServicos.find(s => s.getIdServico === compra.itemId);
                    nomeItem = servico ? servico.nomesserv : 'Serviço não encontrado';
                }
                if (nomeItem) {
                    pets.forEach(pet => {
                        const racaAnimal = pet.raca;
                        if (!contagem[racaAnimal]) {
                            contagem[racaAnimal] = {};
                        }
                        if (!contagem[racaAnimal][nomeItem]) {
                            contagem[racaAnimal][nomeItem] = { quantidade: 0, tipoItem: tipoItem };
                        }
                        contagem[racaAnimal][nomeItem].quantidade++;
                    });
                }
            });
        });
        console.log("Contagem de Compras por Raça:");
        for (const raca in contagem) {
            console.log(`Raça: ${raca}`);
            for (const nomeItem in contagem[raca]) {
                const { quantidade, tipoItem } = contagem[raca][nomeItem];
                console.log(`  Item: ${nomeItem}, Quantidade: ${quantidade}, Tipo: ${tipoItem}`);
            }
        }
    }
    listarTop5ClientesPorCompras() {
        console.log("Top 5 clientes com maiores valores de compras:");
        // Cria uma lista de objetos com o nome do cliente e o total de compras
        let totalComprasClientes = this.clientes.map(cliente => {
            let totalCompras = 0;
            cliente.getCompras().forEach(compra => {
                let valorItem = 0;
                if (compra.tipoItem === 'produto') {
                    let produto = this.empresa.getProdutos.find(p => p.getIdProduto === compra.itemId);
                    if (produto) {
                        valorItem = Number(produto.valorprod);
                    }
                }
                else if (compra.tipoItem === 'servico') {
                    let servico = this.empresa.getServicos.find(s => s.getIdServico === compra.itemId);
                    if (servico) {
                        valorItem = Number(servico.valorserv);
                    }
                }
                // Soma o valor do item ao total de compras do cliente
                totalCompras += valorItem;
            });
            return { nome: cliente.nome, totalCompras: totalCompras };
        });
        // Ordena os clientes pelo total de compras em ordem decrescente
        totalComprasClientes.sort((a, b) => b.totalCompras - a.totalCompras);
        // Exibe apenas os 5 clientes com maiores valores de compras
        totalComprasClientes.slice(0, 5).forEach((cliente, index) => {
            console.log(`${index + 1}. ${cliente.nome} - Total das compras: R$${cliente.totalCompras.toFixed(2)}`);
        });
    }
}
exports.default = ListarCompras;
