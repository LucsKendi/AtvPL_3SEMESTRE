import Entrada from "../io/entrada";
import Atualizar from "./atualiza";
import Servico from "../modelo/servicos";

export default class AtualizarServico extends Atualizar {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
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
            if (novoNome) servicoEncontrado.nomesserv = novoNome;
            if (novoValor !== undefined) servicoEncontrado.valorserv = novoValor;
            if (novaDescricao) servicoEncontrado.descricaoserv = novaDescricao;
            if (novoTipo) servicoEncontrado.tiposerv = novoTipo;

            console.log(`\nAs informações do serviço foram atualizadas com sucesso!\n`);
        } else {
            console.log(`\nNenhum serviço com o ID ${idAtualizar} foi encontrado. Por favor, tente novamente.\n`);
        }
    }
}
