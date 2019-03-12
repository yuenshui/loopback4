### JWT Strategy

```ts

type AuthenticationType = {
  actionType: 'login' | 'verify'
}


class JWTStrategy {
  constructor(
    @inject('SERVICES.LOGIN') loginService: LoginService,
    @inject('SERVICES.TOKEN') tokenService: TokenService
    // Need confirm is it the correct way to get response object
    @inject(RestBindings.Http.RESPONSE) response: Response,
  )
  // login using this particular strategy
  login(request, response): Promise<UserProfile> {
    // Should be an extension point for different extractors
    const credentials = await loginService.extractCredentials(request);
    // if `userProfile` is undefined, it means the verification fails
    const userProfile = await loginService.verifyCredentials(credentials);
    let token;
    if (userProfile) {
      token = await tokenService.generateAccessToken(userProfile);
      // Should be an extension point for different serializers
      await tokenService.serializeAccessToken(token, response);
    } else {
      throw new HttpError[401]('User not found.');
    }
    return userProfile
  };

  // 1. Try to find current user
  // 2. If found, return it
  // 3. If not found, throw 401:
  verify(request) {
    // Should be an extension point for different deserializers
    const token = await tokenService.extractAccessToken(request);
    const userProfile = await tokenService.verifyAccessToken(token);
    return userProfile;
  }
}
```
