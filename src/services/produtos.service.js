import { supabase } from './supabase.js';

export async function getAllProdutos() {
  const { data, error } = await supabase
    .from('produtos')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function getProdutoById(id) {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createProduto(produto) {
  const { data, error } = await supabase
    .from('produtos')
    .insert([produto])
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateProduto(id, produto) {
  const { data, error } = await supabase
    .from('produtos')
    .update(produto)
    .eq('id', id)
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteProduto(id) {
  const { data, error } = await supabase
    .from('produtos')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    throw error;
  }

  return data;
}
