# API da Pizzaria

Backend feito com Node.js, Express e Supabase para cadastro de produtos da pizzaria.

## Rotas

| Método | Rota | Função |
|---|---|---|
| GET | /api/produtos | Lista todos os produtos |
| GET | /api/produtos/:id | Busca um produto pelo ID |
| POST | /api/produtos | Cria um produto |
| PUT | /api/produtos/:id | Atualiza um produto |
| DELETE | /api/produtos/:id | Exclui um produto |

## Status codes usados

- 200: sucesso
- 201: criado com sucesso
- 400: erro de validação
- 404: produto não encontrado
- 500: erro interno do servidor

## Como rodar

```bash
npm install
npm run dev
```

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3000
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY_AQUI
```

No Supabase, execute o SQL do arquivo:

```text
supabase/schema.sql
```

## Exemplos de uso

### Criar produto

```http
POST /api/produtos
Content-Type: application/json

{
  "nome": "Pizza Portuguesa",
  "descricao": "Mussarela, presunto, ovo, cebola e ervilha",
  "categoria": "Pizzas",
  "preco": 46.90,
  "imagem_url": "",
  "disponivel": true
}
```

### Atualizar produto

```http
PUT /api/produtos/1
Content-Type: application/json

{
  "preco": 42.90,
  "disponivel": true
}
```

### Excluir produto

```http
DELETE /api/produtos/1
```
