// ------------------------------------------------------------------
// Front-end simples (vanilla JS) que consome a API REST do back-end.
// Toda a lógica de negócio permanece no servidor (Service/Repository);
// aqui só há chamadas fetch() e atualização da tela.
// ------------------------------------------------------------------

const API = '/api';

// ---------- Navegação entre abas ----------
document.querySelectorAll('nav button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('nav button').forEach((b) => b.classList.remove('ativo'));
    document.querySelectorAll('main section').forEach((s) => s.classList.remove('ativa'));
    btn.classList.add('ativo');
    document.getElementById(btn.dataset.tab).classList.add('ativa');

    if (btn.dataset.tab === 'listagens') carregarListagens();
    if (btn.dataset.tab === 'doacao') carregarFormularioDoacao();
    if (btn.dataset.tab === 'campanha') carregarCampanha();
  });
});

function mostrarMensagem(id, texto, tipo) {
  const el = document.getElementById(id);
  el.textContent = texto;
  el.className = `mensagem ${tipo}`;
  setTimeout(() => { el.className = 'mensagem'; }, 4000);
}

// ---------- Campanha ----------
async function carregarCampanha() {
  const res = await fetch(`${API}/campanha`);
  const dados = await res.json();
  document.getElementById('campanha-descricao').textContent = dados.descricao;
  document.getElementById('stat-doadores').textContent = dados.totalDoadores;
  document.getElementById('stat-doacoes').textContent = dados.totalDoacoes;
  document.getElementById('stat-alimentos').textContent = dados.totalAlimentos;
}

// ---------- Cadastrar Doador ----------
document.getElementById('form-doador').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const payload = {
    nome: fd.get('nome'),
    telefone: fd.get('telefone'),
    email: fd.get('email'),
    endereco: {
      rua: fd.get('rua'),
      numero: fd.get('numero'),
      bairro: fd.get('bairro'),
      cidade: fd.get('cidade'),
      cep: fd.get('cep'),
    },
  };

  const res = await fetch(`${API}/doadores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const dados = await res.json();

  if (res.ok) {
    mostrarMensagem('msg-doador', `Doador "${dados.nome}" cadastrado com sucesso!`, 'sucesso');
    e.target.reset();
  } else {
    mostrarMensagem('msg-doador', dados.erro, 'erro');
  }
});

// ---------- Cadastrar Alimento ----------
document.getElementById('form-alimento').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const payload = {
    nome: fd.get('nome'),
    quantidade: fd.get('quantidade'),
    unidade: fd.get('unidade'),
  };

  const res = await fetch(`${API}/alimentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const dados = await res.json();

  if (res.ok) {
    mostrarMensagem('msg-alimento', `Alimento "${dados.nome}" cadastrado com sucesso!`, 'sucesso');
    e.target.reset();
  } else {
    mostrarMensagem('msg-alimento', dados.erro, 'erro');
  }
});

// ---------- Registrar Doação ----------
async function carregarFormularioDoacao() {
  const [doadores, alimentos] = await Promise.all([
    fetch(`${API}/doadores`).then((r) => r.json()),
    fetch(`${API}/alimentos/disponiveis`).then((r) => r.json()),
  ]);

  const selectDoador = document.getElementById('select-doador');
  selectDoador.innerHTML = '<option value="">Selecione um doador</option>' +
    doadores.map((d) => `<option value="${d.id}">${d.nome}</option>`).join('');

  const checklist = document.getElementById('checklist-alimentos');
  checklist.innerHTML = alimentos.length
    ? alimentos.map((a) => `
        <label>
          <input type="checkbox" name="alimentos" value="${a.id}" />
          ${a.nome} — ${a.quantidade} ${a.unidade}
        </label>
      `).join('')
    : '<span class="vazio">Nenhum alimento disponível. Cadastre alimentos primeiro.</span>';
}

document.getElementById('form-doacao').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const alimentosIds = fd.getAll('alimentos');

  const payload = {
    doadorId: fd.get('doadorId'),
    alimentosIds,
    data: fd.get('data') || undefined,
  };

  const res = await fetch(`${API}/doacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const dados = await res.json();

  if (res.ok) {
    mostrarMensagem('msg-doacao', `Doação #${dados.id} registrada com sucesso!`, 'sucesso');
    e.target.reset();
    carregarFormularioDoacao();
  } else {
    mostrarMensagem('msg-doacao', dados.erro, 'erro');
  }
});

// ---------- Listagens ----------
async function carregarListagens() {
  const [doadores, alimentos, doacoes] = await Promise.all([
    fetch(`${API}/doadores`).then((r) => r.json()),
    fetch(`${API}/alimentos`).then((r) => r.json()),
    fetch(`${API}/doacoes`).then((r) => r.json()),
  ]);

  const tbodyDoadores = document.querySelector('#tabela-doadores tbody');
  tbodyDoadores.innerHTML = doadores.length
    ? doadores.map((d) => `
        <tr>
          <td>${d.id}</td>
          <td>${d.nome}</td>
          <td>${d.telefone}<br/>${d.email}</td>
          <td>${d.endereco?.cidade || '-'}</td>
        </tr>
      `).join('')
    : '<tr><td colspan="4" class="vazio">Nenhum doador cadastrado.</td></tr>';

  const tbodyAlimentos = document.querySelector('#tabela-alimentos tbody');
  tbodyAlimentos.innerHTML = alimentos.length
    ? alimentos.map((a) => `
        <tr>
          <td>${a.id}</td>
          <td>${a.nome}</td>
          <td>${a.quantidade} ${a.unidade}</td>
          <td>${a.doacaoId ? `<span class="tag">Doado (#${a.doacaoId})</span>` : 'Disponível'}</td>
        </tr>
      `).join('')
    : '<tr><td colspan="4" class="vazio">Nenhum alimento cadastrado.</td></tr>';

  const tbodyDoacoes = document.querySelector('#tabela-doacoes tbody');
  tbodyDoacoes.innerHTML = doacoes.length
    ? doacoes.map((d) => `
        <tr>
          <td>${d.id}</td>
          <td>${d.data}</td>
          <td>${d.doador ? d.doador.nome : '-'}</td>
          <td>${(d.alimentos || []).map((a) => `<span class="tag">${a.nome} (${a.quantidade} ${a.unidade})</span>`).join('')}</td>
        </tr>
      `).join('')
    : '<tr><td colspan="4" class="vazio">Nenhuma doação registrada.</td></tr>';
}

// Carrega os dados da campanha ao abrir a página
carregarCampanha();
