create table if not exists produtos (
  id bigint generated always as identity primary key,
  nome text not null,
  descricao text default '',
  categoria text not null,
  preco numeric(10,2) not null check (preco > 0),
  imagem_url text default '',
  disponivel boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create or replace function atualizar_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists produtos_updated_at on produtos;

create trigger produtos_updated_at
before update on produtos
for each row
execute function atualizar_updated_at();

insert into produtos (nome, descricao, categoria, preco, imagem_url, disponivel) values
('Pizza Calabresa', 'Molho de tomate, mussarela, calabresa e cebola', 'Pizzas', 39.90, '', true),
('Pizza Mussarela', 'Molho de tomate, mussarela e orégano', 'Pizzas', 34.90, '', true),
('Pizza Frango com Catupiry', 'Molho, frango desfiado, catupiry e mussarela', 'Pizzas', 44.90, '', true),
('Coca-Cola 2L', 'Refrigerante gelado', 'Bebidas', 12.00, '', true),
('Suco Natural', 'Suco natural da casa', 'Bebidas', 8.00, '', true);
