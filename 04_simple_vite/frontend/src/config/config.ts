export const frontendConfig = {
  commitId: import.meta.env.VITE_COMMIT_ID || 'Unknown',
  buildTime: import.meta.env.VITE_BUILD_TIME || 'Unknown',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  channel: import.meta.env.VITE_CHANNEL || ''
};