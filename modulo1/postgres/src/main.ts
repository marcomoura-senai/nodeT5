import { cadastrarCliente } from "./cliente";
import { initDatabase } from "./database";

async function main() {

  await initDatabase()
  console.log('Banco inicializado')

  const clienteCadastrado = await cadastrarCliente({
    cpf: "10078055872",
    email: "teste2@gmail.com",
    nome: "Cliente teste",
  });

  console.log(`Cliente cadastrado: ${clienteCadastrado.cpf}`);
}

main().catch(console.error);
