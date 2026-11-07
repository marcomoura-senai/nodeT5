import { pool } from "./database";

async function main() {
  const CPF = "10078055109";

  // Insert
  await pool.query(`
 INSERT INTO cliente (nome, email, cpf) VALUES ('Teste de cadastro Node', 'marco8@teste.com', '${CPF}');
  `);


  // SELECT
  const result = await pool.query(
    `SELECT c.nome FROM cliente c WHERE c.cpf = '${CPF}'`,
  );

  if (result.rows.length === 0) {
    console.error("Falha ao buscar");
    return;
  }

  console.log(`Cliente cadastrado: ${result.rows[0].nome}`);

  // UPDATE
  await pool.query(
    `UPDATE cliente SET nome = 'teste atualização' WHERE cpf = '${CPF}'`,
  );

  // SELECT
  const result2 = await pool.query(
    `SELECT c.nome FROM cliente c WHERE c.cpf = '${CPF}'`,
  );

  if (result2.rows.length === 0) {
    console.error("Falha ao buscar cliente atualizado");
    return;
  }

  console.log(`Cliente com nome atualizado: ${result2.rows[0].nome}`);

  // DELETE
  await pool.query(`DELETE FROM cliente WHERE cpf = '${CPF}'`)
}

main().catch(console.error);
