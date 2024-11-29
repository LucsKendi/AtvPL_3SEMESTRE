import React, { useState } from 'react';

type Props = {
    tema: string;
};

interface Produto {
    nome: string;
    valor: number;
    tipo: string;
    descricao: string;
}

interface Servico {
    nome: string;
    valor: number;
    tipo: string;
    descricao: string;
}

const CadastroPage: React.FC<Props> = ({ tema }) => {
    const [formularioAtivo, setFormularioAtivo] = useState<'produto' | 'servico' | null>(null);

    const [produto, setProduto] = useState<Produto>({ nome: '', valor: 0, tipo: '', descricao: '' });
    const [servico, setServico] = useState<Servico>({ nome: '', valor: 0, tipo: '', descricao: '' });

    const handleFormChange = (formulario: 'produto' | 'servico') => setFormularioAtivo(formulario);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        setState: React.Dispatch<React.SetStateAction<any>>
    ) => {
        const { name, value } = e.target;
        setState((prev: any) => ({ ...prev, [name]: value }));
    };

    const salvarDados = (e: React.FormEvent, dados: Produto | Servico, tipo: 'produtos' | 'servicos') => {
        e.preventDefault();
        const camposVazios = Object.values(dados).some((valor) => valor === '' || valor === 0);
        if (camposVazios) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        const dadosArmazenados = JSON.parse(localStorage.getItem(tipo) || '[]');
        dadosArmazenados.push(dados);
        localStorage.setItem(tipo, JSON.stringify(dadosArmazenados));
        alert(`${tipo === 'produtos' ? 'Produto' : 'Serviço'} cadastrado com sucesso!`);

        tipo === 'produtos'
            ? setProduto({ nome: '', valor: 0, tipo: '', descricao: '' })
            : setServico({ nome: '', valor: 0, tipo: '', descricao: '' });
    };

    const temaClasses = tema === 'escuro' ? 'form-escuro' : 'form-claro';

    return (
        <div className={`container ${temaClasses}`}>
            {/* Botões para alternar entre os formulários */}
            <div className="botoes-container">
                <button className="btn btn-secondary" onClick={() => handleFormChange('produto')}>
                    Cadastrar Produto
                </button>
                <button className="btn btn-secondary" onClick={() => handleFormChange('servico')}>
                    Cadastrar Serviço
                </button>
            </div>

            {/* Formulário de cadastro de produto */}
            {formularioAtivo === 'produto' && (
                <div className="form-container">
                    <h2>Cadastro de Produto</h2>
                    <form onSubmit={(e) => salvarDados(e, produto, 'produtos')}>
                        <input
                            type="text"
                            name="nome"
                            value={produto.nome}
                            onChange={(e) => handleChange(e, setProduto)}
                            placeholder="Nome do produto"
                            required
                        />
                        <input
                            type="number"
                            name="valor"
                            value={produto.valor}
                            onChange={(e) => handleChange(e, setProduto)}
                            placeholder="Valor"
                            required
                        />
                        <input
                            type="text"
                            name="tipo"
                            value={produto.tipo}
                            onChange={(e) => handleChange(e, setProduto)}
                            placeholder="Tipo do produto"
                            required
                        />
                        <textarea
                            name="descricao"
                            value={produto.descricao}
                            onChange={(e) => handleChange(e, setProduto)}
                            placeholder="Descrição do produto"
                            required
                        />
                        <button className="btn btn-primary" type="submit">
                            Cadastrar Produto
                        </button>
                    </form>
                </div>
            )}

            {/* Formulário de cadastro de serviço */}
            {formularioAtivo === 'servico' && (
                <div className="form-container">
                    <h2>Cadastro de Serviço</h2>
                    <form onSubmit={(e) => salvarDados(e, servico, 'servicos')}>
                        <input
                            type="text"
                            name="nome"
                            value={servico.nome}
                            onChange={(e) => handleChange(e, setServico)}
                            placeholder="Nome do serviço"
                            required
                        />
                        <input
                            type="number"
                            name="valor"
                            value={servico.valor}
                            onChange={(e) => handleChange(e, setServico)}
                            placeholder="Preço"
                            required
                        />
                        <input
                            type="text"
                            name="tipo"
                            value={servico.tipo}
                            onChange={(e) => handleChange(e, setServico)}
                            placeholder="Tipo do serviço"
                            required
                        />
                        <textarea
                            name="descricao"
                            value={servico.descricao}
                            onChange={(e) => handleChange(e, setServico)}
                            placeholder="Descrição do serviço"
                            required
                        />
                        <button className="btn btn-primary" type="submit">
                            Cadastrar Serviço
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CadastroPage;
