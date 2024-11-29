import Entrada from "../io/entrada";
import Cliente from "../modelo/client";
import Atualizar from "./atualiza";

export default class AtualizarCliente extends Atualizar {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\nIniciando o processo de atualização dos dados do cliente.`);
        const cpfAtualizar = this.entrada.receberTexto(`Por favor, informe o CPF do cliente que deseja atualizar: `);

        const clienteEncontrado = this.clientes.find(cliente => cliente.getCpf.getValor === cpfAtualizar);

        if (clienteEncontrado) {
            console.log(`\nCliente encontrado! Insira as novas informações ou pressione Enter para manter os dados atuais.\n`);

            const novoNome = this.entrada.receberTexto(`Novo nome do cliente: `);
            const desejaNomeSocial = this.entrada.receberTexto(`Deseja adicionar ou atualizar o nome social? (S/N): `);
            let novoNomeSocial = "";
            if (desejaNomeSocial.toLowerCase() === 's') {
                novoNomeSocial = this.entrada.receberTexto(`Digite o nome social: `);
            }
            const novoEmail = this.entrada.receberTexto(`Novo email do cliente: `);
            const novoNumeroRG = this.entrada.receberTexto(`Novo RG do cliente: `);
            const novoDDD = this.entrada.receberTexto(`Novo DDD do telefone: `);
            const novoNumero = this.entrada.receberTexto(`Novo número de telefone: `);

            // Atualizando os dados do cliente
            if (novoNome) clienteEncontrado.nome = novoNome;
            if (novoNomeSocial) clienteEncontrado.nomeSocial = novoNomeSocial;
            if (novoEmail) clienteEncontrado.email = novoEmail;
            if (novoNumeroRG) clienteEncontrado.rg.valorrg = novoNumeroRG;
            if (novoDDD) clienteEncontrado.telefone.ddd = novoDDD;
            if (novoNumero) clienteEncontrado.telefone.numero = novoNumero;

            // Atualizando informações do pet, se houver
            if (clienteEncontrado.pet.length > 1) {
                console.log(`\nEste cliente possui múltiplos pets cadastrados.`);
                clienteEncontrado.pet.forEach((pet, index) => {
                    console.log(`${index + 1}. Nome: ${pet.nome}, Tipo: ${pet.tipo}, Raça: ${pet.raca}, Gênero: ${pet.genero}`);
                });

                const indicePet = parseInt(
                    this.entrada.receberTexto(`Selecione o número do pet que deseja atualizar (ou pressione Enter para ignorar): `)
                ) - 1;

                if (!isNaN(indicePet) && indicePet >= 0 && indicePet < clienteEncontrado.pet.length) {
                    this.atualizarPet(clienteEncontrado.pet[indicePet]);
                }
            } else if (clienteEncontrado.pet.length === 1) {
                this.atualizarPet(clienteEncontrado.pet[0]);
            }

            console.log(`\nAs informações do cliente foram atualizadas com sucesso!\n`);
        } else {
            console.log(`\nNenhum cliente com o CPF ${cpfAtualizar} foi localizado.\n`);
        }
    }

    private atualizarPet(pet): void {
        console.log(`\nAtualizando informações do pet: ${pet.nome}`);
        const novoNomePet = this.entrada.receberTexto(`Novo nome do pet: `);
        const novoTipoPet = this.entrada.receberTexto(`Novo tipo do pet: `);
        const novaRacaPet = this.entrada.receberTexto(`Nova raça do pet: `);
        const novoGeneroPet = this.entrada.receberTexto(`Novo gênero do pet: `);

        if (novoNomePet) pet.nome = novoNomePet;
        if (novoTipoPet) pet.tipo = novoTipoPet;
        if (novaRacaPet) pet.raca = novaRacaPet;
        if (novoGeneroPet) pet.genero = novoGeneroPet;

        console.log(`\nInformações do pet atualizadas com sucesso!`);
    }
}
