/**
 * Controller: DoacaoController
 * Recebe as requisições HTTP relacionadas a Doacao e delega
 * a regra de negócio para o DoacaoService.
 */
class DoacaoController {
  constructor(doacaoService) {
    this.doacaoService = doacaoService;
  }

  registrar = (req, res) => {
    try {
      const doacao = this.doacaoService.registrar(req.body);
      res.status(201).json(doacao);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  };

  listar = (req, res) => {
    res.status(200).json(this.doacaoService.listarTodasDetalhadas());
  };

  detalhar = (req, res) => {
    try {
      const doacao = this.doacaoService.detalhar(req.params.id);
      res.status(200).json(doacao);
    } catch (erro) {
      res.status(404).json({ erro: erro.message });
    }
  };

  listarPorDoador = (req, res) => {
    res.status(200).json(this.doacaoService.listarPorDoador(req.params.doadorId));
  };
}

module.exports = DoacaoController;
