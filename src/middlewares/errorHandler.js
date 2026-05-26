export function errorHandler(error, req, res, next) {
  console.error(error);

  return res.status(500).json({
    erro: 'Erro interno do servidor',
    detalhe: 'Tente novamente mais tarde.'
  });
}
