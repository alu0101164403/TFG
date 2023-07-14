/**
 * @file auth.config.ts
 * @brief Datos para la autenticación y generación de tokens.
 */

/**
 * @namespace AuthConfig
 * @brief Datos para la autenticación y generación de tokens.
 */
export default {
  secret: "app-secret-key",
  //jwtExpiration: 3600,           // 1 hour
  // jwtRefreshExpiration: 86400,   // 24 hours
  /* for test */
  jwtExpiration: 20,          
  jwtRefreshExpiration: 60, 
};