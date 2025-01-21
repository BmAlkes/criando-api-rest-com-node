import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { checkSessionIdExists } from "../middlwares/check-session-id-exists";

//Cookies <-> Formas da gente manter contexto entre requisicoes


// Testes
// unitarios: unidade da sua aplicacao
// integracao: comunicacao entre duas ou mais unidades.
// e2e ponta a ponta: simulam um usuario operando na nossa aplicacao.

//front-end: abre a pagina de login, digite o texto email no campo com ID email, clique no botao...
//backend : chamadas http, websockets.

//Piramide de testes: E2E (Nao dependem de nunhuma tecnologia, nao dependem de arquitetura)


export async function transactionRoutes(app: FastifyInstance) {

  app.get(
    "/",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies;
      const transactions = await knex("transactions")
        .where("sessions_id", sessionId)
        .select();

      return { total: transactions.length, transactions };
    }
  );

  app.get("/:id", { preHandler: [checkSessionIdExists] }, async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const { sessionId } = request.cookies;
    const transaction = await knex("transactions")
      .where("id", id)
      .andWhere("sessions_id", sessionId)
      .first();
    return { transaction };
  });

  app.get(
    "/summary",
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies;
      const summary = await knex("transactions")
        .sum("amount", { as: "amount" })
        .where("sessions_id", sessionId)
        .first();

      return {
        summary,
      };
    }
  );

  app.post("/", async (request, reply) => {
    const createTransactionBodyRequest = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });
    const { amount, title, type } = createTransactionBodyRequest.parse(
      request.body
    );

    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7days
      });
    }

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      sessions_id: sessionId,
    });

    return reply.status(201).send();
  });
}
