import { pool } from "./database";
import { Cliente } from "./types";

type ClienteInput = Omit<Cliente, 'id'>
export async function cadastrarCliente(cliente: ClienteInput): Promise<Cliente> {
  const resultado =  await pool.query<Cliente>(
    `
 INSERT INTO cliente (nome, email, cpf) VALUES ($1, $2, $3) RETURNING *
  `,
    [cliente.nome, cliente.email, cliente.cpf],
  );


  if(resultado.rows.length === 0) {
    throw new Error('Não foi possível cadastrar o cliente')
  }

  return resultado.rows[0]

}

// export async function atualizarCliente() {
//      // UPDATE
//   await pool.query(
//     `UPDATE cliente SET nome = 'teste atualização' WHERE cpf = '${CPF}'`,
//   );

// }

// export async function deletarCliente() {

//   // DELETE
//   await pool.query(`DELETE FROM cliente WHERE cpf = '${CPF}'`)
// }

// export async function buscarCliente() {

// }
