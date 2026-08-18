/**
 * Service: DoacaoService
 * Implementa as regras de negócio relacionadas à Doacao, incluindo
 * a validação do relacionamento Doador -> Doacao -> Alimentos.
 */
class DoacaoService {
  constructor(doacaoRepository, doadorRepository, alimentoRepository) {
    this.doacaoRepository = doacaoRepository;
    this.doadorRepository = doadorRepository;
    this.alimentoRepository = alimentoRepository;
  }

  registrar({ doadorId, alimentosIds, data }) {
    // Regra: uma Doação deve pertencer a um Doador existente
    const doador = this.doadorRepository.findById(doadorId);
    if (!doador) {
      throw new Error('Doador informado não existe. Cadastre o doador antes de registrar a doação.');
    }

    // Regra: uma Doação precisa ter pelo menos um Alimento
    if (!Array.isArray(alimentosIds) || alimentosIds.length === 0) {
      throw new Error('Selecione ao menos um alimento para a doação.');
    }

    const alimentos = this.alimentoRepository.findByIds(alimentosIds);
    if (alimentos.length !== alimentosIds.length) {
      throw new Error('Um ou mais alimentos informados não foram encontrados.');
    }

    const doacao = this.doacaoRepository.create({
      data: data || new Date().toISOString().slice(0, 10),
      doadorId: doador.id,
      alimentosIds: alimentos.map((a) => a.id),
    });

    // Vincula cada alimento à doação recém-criada (relacionamento 1:N)
    alimentos.forEach((a) => this.alimentoRepository.vincularADoacao(a.id, doacao.id));

    return doacao;
  }

  listarTodas() {
    return this.doacaoRepository.findAll();
  }

  // Monta a doação já "populada" com os dados do doador e dos alimentos,
  // para facilitar a exibição no front-end.
  detalhar(id) {
    const doacao = this.doacaoRepository.findById(id);
    if (!doacao) throw new Error('Doação não encontrada.');

    const doador = this.doadorRepository.findById(doacao.doadorId);
    const alimentos = this.alimentoRepository.findByDoacaoId(doacao.id);

    return { ...doacao, doador, alimentos };
  }

  listarTodasDetalhadas() {
    return this.doacaoRepository.findAll().map((d) => this.detalhar(d.id));
  }

  listarPorDoador(doadorId) {
    return this.doacaoRepository
      .findByDoadorId(doadorId)
      .map((d) => this.detalhar(d.id));
  }
}

module.exports = DoacaoService;
