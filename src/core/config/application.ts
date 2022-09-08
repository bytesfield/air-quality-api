export default {
  nodeEnv: process.env.NODE_ENV?.toLowerCase() || 'development',
  cron: {
    check_air_qality: {
      cron_expression: process.env.AIR_QUALITY_CRON_EXPRESSION || '*/1 * * * *',
      run: process.env.CRON_RUN_CHECK_AIR_QUALITY === 'true'
    }
  }
};
