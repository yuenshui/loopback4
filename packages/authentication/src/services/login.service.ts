import {Request} from '@loopback/rest';
import { UserProfile } from '../types';

/**
 * A service for performing the login action in an authentication strategy.
 * 
 * Usually a client user uses basic credentials to login, or is redirected to a
 * third-party application that grants limited access. Then a generated access token
 * will be returned to the client side, you could either store the user information
 * in the token(token based auth) or in the session(session based auth).
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
export interface LoginService<U, C> {
  /**
   * Verify the identity of a user, construct a corresponding user profile using
   * the user information and return the user profile.
   * 
   * A pseudo code for local authentication:
   * ```ts
   * verifyCredentials(credentials: C): Promise<U> {
   *   // the id field shouldn't be hardcoded
   *   user = await User.find(credentials.id);
   *   matched = await passwordService.compare(user.password, credentials.password);
   *   if (matched) return user;
   *   // throw a JS error, agnostic of the client type
   *   throw new Error('authentication failed');
   * };
   * ```
   * 
   * A pseudo code for 3rd party authentication:
   * ```ts
   * type UserInfo = {
   *   accessToken: string;
   *   refreshToken: string;
   *   userProfile: string;
   * };
   * verifyCredentials(credentials: C): Promise<U> {
   *   try {
   *     userInfo: UserInfo = await getUserInfoFromFB(credentials);
   *   } catch (e) {
   *     // throw a JS error, agnostic of the client type
   *     throw e;
   *   }
   * };
   * ```
   * @param credentials Credentials for basic auth or configurations for 3rd party.
   *                    Example see the 
   */
  verifyCredentials?(credentials: C): Promise<U>;

  /**
   * Convert the user returned by `verifyCredentials()` to a common
   * user profile that describes a user in your application
   * @param user The user returned from `verifyCredentials()`
   */
  convertToUserProfile(user: U): UserProfile;
  /**
   * Logout a user. 
   * 
   * For JWT token: client side clears the cookie
   * For session: delete the session entry on server/client side
   * Code example TBD
   * @param request The incoming Request
   */
  // This function should probably moved to session service?
  invalidateCredentials?(request: Request): Promise<boolean>
}
