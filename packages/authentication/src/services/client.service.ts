import {Request} from '@loopback/rest';

/**
 * Services for extracting credentials or token from HTTP request.
 * 
 * 
 * Type `C` stands for the type of your credential object.
 * 
 * - For local strategy:
 * 
 * A typical credential would be: 
 * {
 *   username: username, 
 *   password: password
 * }
 *
 * - For oauth strategy:
 * 
 * A typical credential would be:
 * {
 *   clientId: string;
 *   clientSecret: string;
 *   callbackURL: string;
 * }
 * 
 * It could be read from a local configuration file in the app
 * 
 * - For saml strategy:
 * 
 * A typical credential would be:
 * 
 * {
 *   path: string;
 *   issuer: string;
 *   entryPoint: string;
 * }
 * 
 * It could be read from a local configuration file in the app.
 */
export interface ExtractorService<C> {
  /**
   * Extract the credentials from the HTTP layer or read them from the local file.
   * 
   * For example, extract the basic auth credential `email` and `password` 
   * from a HTTP request header.
   * 
   * Or for third-party access granting, like login facebook account using oauth 2.0, load
   * the configuration `clientId`, `client`, `scopes`, `callbackURL` from a local file.
   * @param request The incoming Request
   */
  // Here I hardcoded the request type to be HTTP request,
  // while a generic type R should be used here to support
  // other clients like SOAP, GRPC
  extractCredentials(request: Request): Promise<C>;
}
