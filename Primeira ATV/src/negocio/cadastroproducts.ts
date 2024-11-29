import Entrada from "../io/entrada";
import Produto from "../modelo/product";
import Cadastro from "./cadastro";

export default class CadastroProduto extends Cadastro {
    private produtos: Array<Produto>;
    private entrada: Entrada;
    private static idCounter: number = 1;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\n=== Início do Cadastro de Produtos ===\n`);

        const idprod = CadastroProduto.idCounter++;
        const nomeprod = this.entrada.receberTexto(`Por favor, informe o nome do produto:`);

        const valorprodInput = this.entrada.receberNumero(`Por favor, informe o valor do produto:`);
        const valorprod = Number(valorprodInput);

        if (isNaN(valorprod)) {
            console.error("Erro: Valor inválido. Por favor, insira um número válido.");
            return; // Encerra o método caso o valor seja inválido
        }

        const descricaoprod = this.entrada.receberTexto(`Por favor, insira uma breve descrição do produto:`);
        const tipoprod = this.entrada.receberTexto(`Por favor, informe o tipo do produto:`);

        // Criação do objeto Produto e adição à lista de produtos
        const produto = new Produto(idprod, nomeprod, valorprod, descricaoprod, tipoprod);
        this.produtos.push(produto);

        console.log(`\nCadastro concluído com sucesso! ID do produto: ${idprod}\n`);
    }
}
