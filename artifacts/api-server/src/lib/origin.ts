interface OriginConfig {
  appOrigin?: string;
  developmentOrigins?: string;
  nodeEnv?: string;
}

const productionOrigins = [
  "https://the-pulp-doctor.vercel.app",
  "https://thepulpdoctor.com",
  "https://www.thepulpdoctor.com",
];

function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/+$/, "");
}

export function getAllowedOrigins(
  config: OriginConfig = {
    appOrigin: process.env.APP_ORIGIN,
    developmentOrigins: process.env.DEV_FRONTEND_ORIGINS,
    nodeEnv: process.env.NODE_ENV,
  },
): string[] {
  const origins = (config.appOrigin ?? "")
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean);

  // Keep production frontends allowed even if APP_ORIGIN is missing.
  origins.push(...productionOrigins);

  if (config.nodeEnv === "development") {
    origins.push(
      ...(config.developmentOrigins ?? "")
        .split(",")
        .map(normalizeOrigin)
        .filter(Boolean),
    );
  }

  return [...new Set(origins)];
}
