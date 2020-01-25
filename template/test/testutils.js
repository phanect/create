import express = require("express");

export class Server {
  private server;
  private port;

  constructor(port) {
    this.port = port;
  }

  async start(): Promise<void> {
    const app = express();
    const port = this.port;

    app.get("/", (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html lang="ja">
          <head>
            <title>test</title>
          </head>
          <body>
            <p>test</p>
          </body>
        </html>
      `);
    });

    const self = this;

    return new Promise(resolve => {
      self.server = app.listen({ port }, () => resolve());
    });
  }

  async close() {
    const self = this;

    return new Promise(resolve => {
      self.server.close(() => resolve());
    });
  }
}
