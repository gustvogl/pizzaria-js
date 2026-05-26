import { supabase } from '../database.js';

const TABELA = 'produtos';

export async function listarProdutos() {
  const { data, error } = await supabase
    .from(TABELA)
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
}

export async function buscarProdutoPorId(id) {
  const { data, error } = await supabase
    .from(TABELA)
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function criarProduto(produto) {
  const { data, error } = await supabase
    .from(TABELA)
    .insert(produto)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function atualizarProduto(id, produto) {
  const produtoExiste = await buscarProdutoPorId(id);

  if (!produtoExiste) {
    return null;
  }

  const { data, error } = await supabase
    .from(TABELA)
    .update(produto)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletarProduto(id) {
  const produtoExiste = await buscarProdutoPorId(id);

  if (!produtoExiste) {
    return null;
  }

  const { error } = await supabase
    .from(TABELA)
    .delete()
    .eq('id', id);

  if (error) throw error;
  return produtoExiste;
}
