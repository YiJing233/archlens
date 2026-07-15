export type McpRuntimeConfig = {
  authToken: string;
  authEnabled: boolean;
  rateLimitPerMinute: number;
};

function env(name: string) {
  return typeof process !== "undefined" ? process.env[name]?.trim() ?? "" : "";
}

function positiveInteger(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 10_000 ? parsed : fallback;
}

export function getMcpRuntimeConfig(): McpRuntimeConfig {
  const authToken = env("ARCHLENS_MCP_TOKEN");
  return {
    authToken,
    authEnabled: Boolean(authToken),
    rateLimitPerMinute: positiveInteger(env("ARCHLENS_MCP_RATE_LIMIT_PER_MINUTE"), 60),
  };
}

export function hasValidMcpAuthorization(request: Request, config = getMcpRuntimeConfig()) {
  if (!config.authEnabled) return true;
  return request.headers.get("authorization") === `Bearer ${config.authToken}`;
}
