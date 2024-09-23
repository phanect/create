import { afterEach, beforeEach, expect, test } from "vitest";
import { Server } from "./testutils";

const port = 3456;
const url = `http://localhost:${port}`;

let server: Server;

beforeEach(async () => {
  server = new Server(port);
  await server.start();
});

afterEach(async () => {
  await server.close();
});

test("test", async () => {
  expect(1).toBe(1);
}, 50000);
