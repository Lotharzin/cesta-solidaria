/**
 * Service: AlimentoService
 * Implementa as regras de negócio relacionadas ao Alimento.
 */
class AlimentoService {
  constructor(alimentoRepository) {
    this.alimentoRepository = alimentoRepository;
  }

  cadastrar({ nome, quantidade, unidade }) {
    if (!nome || !nome.trim()) {
      throw new Error('O nome do alimento é obrigatório.');
    }
    const qtd = Number(quantidade);
    if (!qtd || qtd <= 0) {
      throw new Error('A quantidade deve ser um número maior que zero.');
    }
    if (!unidade || !unidade.trim()) {
      throw new Error('A unidade de medida é obrigatória (ex: kg, un, L).');
    }

    return this.alimentoRepository.create({ nome, quantidade: qtd, unidade });
  }

  listarTodos() {
    return this.alimentoRepository.findAll();
  }

  // Alimentos ainda não vinculados a nenhuma doação (disponíveis para vincular)
  listarDisponiveis() {
    return this.alimentoRepository.findAll().filter((a) => a.doacaoId === null);
  }

  buscarPorId(id) {
    const alimento = this.alimentoRepository.findById(id);
    if (!alimento) throw new Error('Alimento não encontrado.');
    return alimento;
  }
}

module.exports = AlimentoService;
