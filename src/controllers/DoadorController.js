/**
 * Controller: DoadorController
 * Recebe as requisições HTTP relacionadas a Doador e delega
 * a regra de negócio para o DoadorService.
 */
class DoadorController {
  constructor(doadorService) {
    this.doadorService = doadorService;
  }

  cadastrar = (req, res) => {
    try {
      const doador = this.doadorService.cadastrar(req.body);
      res.status(201).json(doador);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  };

  listar = (req, res) => {
    res.status(200).json(this.doadorService.listarTodos());
  };

  buscarPorId = (req, res) => {
    try {
      const doador = this.doadorService.buscarPorId(req.params.id);
      res.status(200).json(doador);
    } catch (erro) {
      res.status(404).json({ erro: erro.message });
    }
  };
}

module.exports = DoadorController;
