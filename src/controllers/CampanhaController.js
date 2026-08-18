/**
 * Controller: CampanhaController
 * Fornece as informações institucionais da campanha e um pequeno
 * resumo estatístico (total de doadores, doações e alimentos).
 */
class CampanhaController {
  constructor(doadorService, alimentoService, doacaoService) {
    this.doadorService = doadorService;
    this.alimentoService = alimentoService;
    this.doacaoService = doacaoService;
  }

  info = (req, res) => {
    res.status(200).json({
      nome: 'Cesta Solidária',
      slogan: 'Unidos contra a fome',
      descricao:
        'A campanha Cesta Solidária arrecada alimentos não perecíveis para ' +
        'famílias em situação de vulnerabilidade social. Cadastre-se como ' +
        'doador, informe os alimentos e registre sua doação — juntos ' +
        'fazemos a diferença.',
      totalDoadores: this.doadorService.listarTodos().length,
      totalDoacoes: this.doacaoService.listarTodas().length,
      totalAlimentos: this.alimentoService.listarTodos().length,
    });
  };
}

module.exports = CampanhaController;
