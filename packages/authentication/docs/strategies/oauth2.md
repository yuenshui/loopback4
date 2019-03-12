### OAuth2 Strategy

```ts
type Credentials = {
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}

type TokenAndUser = {
  accesstoken: string;
  refreshtoken: string;
  userProfile: object
}

class OAuth2Strategy {
  constructor(
    @inejct('SERVICES.LOGIN') loginService: LoginService,
    @inejct('SERVICES.TOKEN') tokenService: TokenService
    // Need confirm is it the correct way to get response object
    @inject(RestBindings.Http.RESPONSE) response: Response,
  )
  // login using this particular strategy
  authenticate(request, response): Promise<UserProfile | undefined> {
    // Should be an extension point for different extractors
    const credentials: Credentials = await loginService.extractCredentials(request);
    // if `userProfile` is undefined, it means the verification fails
    const tokenAndUser: TokenAndUser = await loginService.verifyCredentials(credentials);

    // Should be an extension point for different serializers
    await tokenService.serializeAccessToken(tokenAndUser, response);
    return tokenAndUser.userProfile;
  };

  ensureLoggedIn(request) {
    // Should be an extension point for different deserializers
    const token = await tokenService.extractAccessToken(request);
    const userProfile = await tokenService.verifyAccessToken(token);
    return userProfile;
  }
}
```
