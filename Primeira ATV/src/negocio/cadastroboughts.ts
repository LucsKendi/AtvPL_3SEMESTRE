import Entrada from "../io/entrada";
import Empresa from "../modelo/empresas";
import Cliente from "../modelo/client";
import Produto from "../modelo/product";
import Servico from "../modelo/servicos";
import Compra from "../modelo/compra";

export default class CadastroCompra {
    private empresa: Empresa;
    private entrada: Entrada;

    constructor(empresa: Empresa) {
        this.empresa = empresa;
        this.entrada = new Entrada();
    }

    public cadastrarCompra(): void {
        console.log(`\nInício do cadastro de compra.`);

        const cpfCliente = this.entrada.receberTexto(`Informe o CPF do cliente: `);
        const cliente = this.empresa.getClientes.find(cliente => cliente.getCpf.getValor === cpfCliente);

        if (!cliente) {
            console.log(`\nErro: Cliente com CPF ${cpfCliente} não encontrado.`);
            return;
        }

        console.log(`\nCliente encontrado: ${cliente.nome}\n`);

        const opcaoItem = this.entrada.receberNumero(`Deseja comprar um Produto (1) ou um Serviço (2)? `);

        switch (opcaoItem) {
            case 1:
                this.cadastrarProduto(cliente);
                break;
            case 2:
                this.cadastrarServico(cliente);
                break;
            default:
                console.log(`\nErro: Opção inválida. Por favor, escolha 1 para Produto ou 2 para Serviço.`);
        }
    }

    private cadastrarProduto(cliente: Cliente): void {
        console.log(`\nProdutos disponíveis:`);
        this.empresa.getProdutos.forEach(produto => {
            console.log(`ID: ${produto.getIdProduto} - Nome: ${produto.nomeprod} - Valor: ${produto.valorprod}`);
        });

        const idProduto = this.entrada.receberNumero(`Informe o ID do produto desejado: `);
        const produto = this.empresa.getProdutos.find(produto => produto.getIdProduto === idProduto);

        if (!produto) {
            console.log(`\nErro: Produto com ID ${idProduto} não encontrado.`);
            return;
        }

        const novaCompra = new Compra(cliente.getCpf.getValor, produto.getIdProduto, 'produto');
        cliente.adicionarCompra(novaCompra);
        console.log(`\nCompra registrada com sucesso! Produto: ${produto.nomeprod}`);
    }

    private cadastrarServico(cliente: Cliente): void {
        console.log(`\nServiços disponíveis:`);
        this.empresa.getServicos.forEach(servico => {
            console.log(`ID: ${servico.getIdServico} - Nome: ${servico.nomesserv} - Valor: ${servico.valorserv}`);
        });

        const idServico = this.entrada.receberNumero(`Informe o ID do serviço desejado: `);
        const servico = this.empresa.getServicos.find(servico => servico.getIdServico === idServico);

        if (!servico) {
            console.log(`\nErro: Serviço com ID ${idServico} não encontrado.`);
            return;
        }

        const novaCompra = new Compra(cliente.getCpf.getValor, servico.getIdServico, 'servico');
        cliente.adicionarCompra(novaCompra);
        console.log(`\nCompra registrada com sucesso! Serviço: ${servico.nomesserv}`);
    }
}
