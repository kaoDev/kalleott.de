const vercelEnv = process.env.VERCEL_ENV;
const vercelBranchUrl = process.env.VERCEL_BRANCH_URL;
const vercelProjectProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export function getEnvServerUrl() {
  if (!vercelEnv) {
    return "http://localhost:3000";
  }

  if (vercelEnv === "production") {
    return `https://${vercelProjectProductionUrl}`;
  }

  return `https://${vercelBranchUrl}`;
}
