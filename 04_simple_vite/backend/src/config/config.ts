export const backendConfig = {
  commitId: process.env.COMMIT_ID || 'Unknown',
  buildTime: process.env.BUILD_TIME || 'Unknown',
  deployTime: process.env.DEPLOY_TIME || 'Unknown',
  frontendUrl: process.env.FRONTEND_URL || '',
}
