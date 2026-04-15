interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * startup-oracle MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Evaluate a startup idea. Returns a brutal verdict, number of pivots required, a 
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'startup_oracle_evaluate',
    description: 'Evaluate a startup idea. Returns a brutal verdict, number of pivots required, a funny comparable, a realistic YC rejection reason, and the actual TAM (always $4 trillion).',
    inputSchema: {
      type: 'object' as const,
      properties: {"idea": {"type": "string", "description": "Your startup idea"}, "have_you_talked_to_users": {"type": "boolean", "description": "Have you actually talked to users?"}, "is_it_uber_for": {"type": "boolean", "description": "Is this an \"Uber for X\" idea?"}, "vc_buzzword_count": {"type": "number", "description": "Number of VC buzzwords in your pitch"}},
      required: ["idea"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('startup-oracle API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'startup_oracle_evaluate':
      return callApi('https://api.stupidapis.com/startup-oracle/evaluate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
