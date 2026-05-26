import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from '../services/produtos.service.js';

function validarProduto(body, parcial = false) {
  const erros = [];
  const camposObrigatorios = ['nome', 'categoria', 'preco'];

  if (!parcial) {
    camposObrigatorios.forEach((campo) => {
      if (body[campo] === undefined || body[campo] === null || body[campo] === '') {
        erros.push(`O campo ${campo} é obrigatório.`);
      }
    });
  }

  if (body.nome !== undefined && String(body.nome).trim().length < 2) {
    erros.push('O nome deve ter pelo menos 2 caracteres.');
  }

  if (body.categoria !== undefined && String(body.categoria).trim().length < 2) {
    erros.push('A categoria deve ter pelo menos 2 caracteres.');
  }

  if (body.preco !== undefined && (Number.isNaN(Number(body.preco)) || Number(body.preco) <= 0)) {
    erros.push('O preço deve ser um número maior que zero.');
  }

  if (body.disponivel !== undefined && typeof body.disponivel !== 'boolean') {
    erros.push('O campo disponivel deve ser true ou false.');
  }

  return erros;
}

function montarProduto(body) {
  const produto = {};

  if (body.nome !== undefined) produto.nome = String(body.nome).trim();
  if (body.descricao !== undefined) produto.descricao = String(body.descricao).trim();
  if (body.categoria !== undefined) produto.categoria = String(body.categoria).trim();
  if (body.preco !== undefined) produto.preco = Number(body.preco);
  if (body.imagem_url !== undefined) produto.imagem_url = String(body.imagem_url).trim();
  if (body.disponivel !== undefined) produto.disponivel = body.disponivel;

  return produto;
}

export async function index(req, res, next) {
  try {
    const produtos = await listarProdutos();
    return res.status(200).json(produtos);
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    const { id } = req.params;
    const produto = await buscarProdutoPorId(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    return res.status(200).json(produto);
  } catch (error) {
    next(error);
  }
}

export async function store(req, res, next) {
  try {
    const erros = validarProduto(req.body);

    if (erros.length > 0) {
      return res.status(400).json({ erro: 'Erro de validação.', detalhes: erros });
    }

    const produtoCriado = await criarProduto(montarProduto(req.body));
    return res.status(201).json(produtoCriado);
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const erros = validarProduto(req.body, true);

    if (Object.keys(req.body).length === 0) {
      erros.push('Envie pelo menos um campo para atualizar.');
    }

    if (erros.length > 0) {
      return res.status(400).json({ erro: 'Erro de validação.', detalhes: erros });
    }

    const produtoAtualizado = await atualizarProduto(id, montarProduto(req.body));

    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado para atualização.' });
    }

    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    const { id } = req.params;
    const produtoDeletado = await deletarProduto(id);

    if (!produtoDeletado) {
      return res.status(404).json({ erro: 'Produto não encontrado para exclusão.' });
    }

    return res.status(200).json({ mensagem: 'Produto excluído com sucesso.', produto: produtoDeletado });
  } catch (error) {
    next(error);
  }
}
