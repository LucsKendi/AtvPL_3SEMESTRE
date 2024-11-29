import Entrada from "../io/entrada";
import Atualizar from "./atualiza";
import Produto from "../modelo/product";

export default class AtualizarProduto extends Atualizar {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\nIniciando o processo de atualização de produtos.`);
        const idAtualizar = this.entrada.receberNumero(`Por favor, informe o ID do produto que deseja atualizar: `);

        const produtoEncontrado = this.produtos.find(produto => produto.getIdProduto === idAtualizar);

        if (produtoEncontrado) {
            console.log(`\nProduto encontrado! Insira as novas informações ou pressione Enter para manter os dados atuais.\n`);

            const novoNome = this.entrada.receberTexto(`Novo nome do produto: `);
            const novoValorInput = this.entrada.receberTexto(`Novo valor do produto: `);
            const novoValor = novoValorInput ? Number(novoValorInput) : undefined;

            if (novoValorInput && isNaN(novoValor)) {
                console.error("\nErro: O valor informado não é válido. Por favor, tente novamente.");
                return;
            }

            const novaDescricao = this.entrada.receberTexto(`Nova descrição do produto: `);

            // Atualizando os dados do produto
            if (novoNome) produtoEncontrado.nomeprod = novoNome;
            if (novoValor !== undefined) produtoEncontrado.valorprod = novoValor;
            if (novaDescricao) produtoEncontrado.descricaoprod = novaDescricao;

            console.log(`\nAs informações do produto foram atualizadas com sucesso!\n`);
        } else {
            console.log(`\nNão foi possível localizar um produto com o ID ${idAtualizar}. Tente novamente.\n`);
        }
    }
}
