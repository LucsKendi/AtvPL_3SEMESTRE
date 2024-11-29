import Entrada from "../io/entrada";
import Cliente from "../modelo/client";
import CPF from "../modelo/cpf";
import Cadastro from "./cadastro";
import Pet from "../modelo/pets";
import Telefone from "../modelo/telefone";
import RG from "../modelo/rg";
import Compra from "../modelo/compra";

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    private stringParaData(dataString: string): Date {
        const [dia, mes, ano] = dataString.split("/").map(Number);
        return new Date(ano, mes - 1, dia); // Meses são indexados de 0 a 11
    }

    public cadastrar(): void {
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

        const telefone = new Telefone(ddd, numero);
        const cpf = new CPF(cpfValor, dataCpf);
        const rg = new RG(rgValor, dataRg);
        const compras: Array<Compra> = [];

        // Cadastro de Pets
        const pets: Array<Pet> = [];
        let cadastrarMaisPets: boolean;
        do {
            const nomePet = this.entrada.receberTexto(`Por favor informe o nome do pet: `);
            const tipo = this.entrada.receberTexto(`Por favor informe o tipo do pet: `);
            const raca = this.entrada.receberTexto(`Por favor informe a raça do pet: `);
            const genero = this.entrada.receberTexto(`Por favor informe o gênero do pet: `);

            pets.push(new Pet(nomePet, raca, genero, tipo));

            const maisPets = this.entrada.receberTexto(`Deseja cadastrar mais um pet? (S/N): `).toLowerCase();
            cadastrarMaisPets = maisPets === 's';
        } while (cadastrarMaisPets);

        // Criação e Adição do Cliente
        const cliente = new Cliente(nome, nomeSocial, email, cpf, telefone, pets, rg, compras);
        this.clientes.push(cliente);

        console.log(`\nCadastro concluído com sucesso! :)`);
    }
}
