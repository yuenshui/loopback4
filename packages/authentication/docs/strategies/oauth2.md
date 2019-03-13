### OAuth2 Strategy

```ts
type Credentials = {
  clientId: string;
  clientSecret: string;
  callbackURL: string;
  scopes: string[];
}

type TokenAndUser = {
  accesstoken: string;
  refreshtoken: string;
  userProfile: object
}

class OAuth2Strategy {
  constructor(
    @inject(AuthenticationBindings.SERVICES.LOGIN) loginService: LoginService,
    @inject(AuthenticationBindings.SERVICES.TOKEN) tokenService: TokenService,
    @inject(AuthenticationBindings.SERVICES.TRANSPORT) transportService: TransportService,
    // Need confirm is it the correct way to get response object
    @inject(RestBindings.Http.RESPONSE) response: Response,
  )
  // login using this particular strategy
  login(request, response): Promise<UserProfile | undefined> {
    // Should be an extension point for different extractors
    // For oauth2 auth the credentials are usually loaded from a local configuration file
    const credentials: Credentials = await transportService.extractCredentials();
    // if `userProfile` is undefined, it means the verification fails
    const tokenAndUser: TokenAndUser = await loginService.verifyCredentials(credentials);
    const userProfile:UserProfile = await loginService.convertToUserProfile(tokenAndUser);
    // Should be an extension point for different serializers
    await tokenTransportService.serializeAccessToken(tokenAndUser, response);
    return userProfile;
  };

  verify(request) {
    // Should be an extension point for different deserializers
    const token = await tokenTransportService.extractAccessToken(request);
    const userProfile = await tokenService.verifyAccessToken(token);
    return userProfile;
  }
}
```
