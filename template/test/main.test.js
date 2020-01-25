import { Server } from "./testutils";

const port = 3456;
const url = `http://localhost:${port}`;

let server;

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
