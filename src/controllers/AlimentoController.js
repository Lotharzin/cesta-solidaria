/**
 * Controller: AlimentoController
 * Recebe as requisições HTTP relacionadas a Alimento e delega
 * a regra de negócio para o AlimentoService.
 */
class AlimentoController {
  constructor(alimentoService) {
    this.alimentoService = alimentoService;
  }

  cadastrar = (req, res) => {
    try {
      const alimento = this.alimentoService.cadastrar(req.body);
      res.status(201).json(alimento);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  };

  listar = (req, res) => {
    res.status(200).json(this.alimentoService.listarTodos());
  };

  listarDisponiveis = (req, res) => {
    res.status(200).json(this.alimentoService.listarDisponiveis());
  };
}

module.exports = AlimentoController;
