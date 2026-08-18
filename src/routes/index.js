const { Router } = require('express');

// Repositories
const DoadorRepository = require('../repositories/DoadorRepository');
const AlimentoRepository = require('../repositories/AlimentoRepository');
const DoacaoRepository = require('../repositories/DoacaoRepository');

// Services
const DoadorService = require('../services/DoadorService');
const AlimentoService = require('../services/AlimentoService');
const DoacaoService = require('../services/DoacaoService');

// Controllers
const DoadorController = require('../controllers/DoadorController');
const AlimentoController = require('../controllers/AlimentoController');
const DoacaoController = require('../controllers/DoacaoController');
const CampanhaController = require('../controllers/CampanhaController');

/**
 * Composition Root: instancia cada camada respeitando o fluxo
 * Controller -> Service -> Repository -> Dados, e conecta as rotas HTTP.
 */
const router = Router();

const doadorRepository = new DoadorRepository();
const alimentoRepository = new AlimentoRepository();
const doacaoRepository = new DoacaoRepository();

const doadorService = new DoadorService(doadorRepository);
const alimentoService = new AlimentoService(alimentoRepository);
const doacaoService = new DoacaoService(doacaoRepository, doadorRepository, alimentoRepository);

const doadorController = new DoadorController(doadorService);
const alimentoController = new AlimentoController(alimentoService);
const doacaoController = new DoacaoController(doacaoService);
const campanhaController = new CampanhaController(doadorService, alimentoService, doacaoService);

// Campanha
router.get('/api/campanha', campanhaController.info);

// Doador
router.post('/api/doadores', doadorController.cadastrar);
router.get('/api/doadores', doadorController.listar);
router.get('/api/doadores/:id', doadorController.buscarPorId);

// Alimento
router.post('/api/alimentos', alimentoController.cadastrar);
router.get('/api/alimentos', alimentoController.listar);
router.get('/api/alimentos/disponiveis', alimentoController.listarDisponiveis);

// Doação
router.post('/api/doacoes', doacaoController.registrar);
router.get('/api/doacoes', doacaoController.listar);
router.get('/api/doacoes/:id', doacaoController.detalhar);
router.get('/api/doadores/:doadorId/doacoes', doacaoController.listarPorDoador);

module.exports = router;
