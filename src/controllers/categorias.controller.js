import { supabase } from '../services/supabase.js';

export async function categorias(req, res) {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      return res.status(500).json({
        erro: 'Erro ao buscar categorias'
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro interno do servidor'
    });
  }
}