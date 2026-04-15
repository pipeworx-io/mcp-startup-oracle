# mcp-startup-oracle

startup-oracle MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `startup_oracle_evaluate` | Evaluate a startup idea. Returns a brutal verdict, number of pivots required, a funny comparable, a realistic YC rejection reason, and the actual TAM (always $4 trillion). |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "startup-oracle": {
      "url": "https://gateway.pipeworx.io/startup-oracle/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use startup-oracle
```

## License

MIT
