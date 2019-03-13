### JWT Strategy

```ts

type Credentials = {
  email: string;
  password: string;
}

class JWTStrategy {
  constructor(
    @inject(AuthenticationBindings.SERVICES.LOGIN) loginService: LoginService,
    @inject(AuthenticationBindings.SERVICES.TOKEN) tokenService: TokenService
    @inject(AuthenticationBindings.SERVICES.TRANSPORT) transportService: TransportService
    // Need confirm is it the correct way to get response object
    @inject(RestBindings.Http.RESPONSE) response: Response,
  )

  login(request, response): Promise<UserProfile | undefined> {
    // Should be an extension point for different extractors
    const credentials: Credentials = await transportService.extractCredentials(request);
    // if `user` is undefined, it means the verification fails
    const user = await loginService.verifyCredentials(credentials);

    if (user) {
      const userProfile = await loginService.convertToUserProfile(user);
      let token;
      token = await tokenService.generateAccessToken(userProfile);
      // Should be an extension point for different serializers
      await tokenTransportService.serializeAccessToken(token, response);
      return userProfile;
    } else {
      throw new HttpError[401]('User not found.');
    }
  };

  // 1. Try to find current user
  // 2. If found, return it
  // 3. If not found, throw 401:
  verify(request) {
    // Should be an extension point for different deserializers
    const token = await tokenTransportService.extractAccessToken(request);
    const userProfile = await tokenService.verifyAccessToken(token);
    return userProfile;
  }
}
```
