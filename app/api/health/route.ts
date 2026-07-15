import { cases } from "@/lib/data";
import { getDatasetManifest } from "@/lib/dataset";
import { MCP_PROTOCOL_VERSION, MCP_SCHEMA_VERSION, MCP_SERVER_VERSION } from "@/lib/mcp";
import { getMcpRuntimeConfig } from "@/lib/runtime-config";

export function GET() {
  const config = getMcpRuntimeConfig();
  return Response.json({
    status: "ok",
    service: "archlens",
    runtime: "demo",
    versions: { server: MCP_SERVER_VERSION, schema: MCP_SCHEMA_VERSION, protocol: MCP_PROTOCOL_VERSION },
    mcp: { auth: config.authEnabled ? "bearer" : "none", rateLimitPerMinute: config.rateLimitPerMinute },
    dataset: getDatasetManifest(),
    checks: { caseLibrary: cases.length > 0 ? "ok" : "failed" },
  }, { headers: { "Cache-Control": "no-store" } });
}
