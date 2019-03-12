### Auth strategy class

There are two options of defining the strategy interface. One is having only one function `authenticate` which takes in the action type and handles login and verify accordingly. The other one is having two functions `login` and `verify`.

After having the sync up meeting with Raymond we agreed on option1, while when writing the pseudo code for strategies + services, we feel the word `authenticate` is very misleading and switched back to having two separate functions to distinguish between the login and verify flow.

I haven't got enough time to summarize the pros/cons of each option. Will do it later on and discussion/feedback are welcomed. This PR uses option2, but we can change that back if necessary.

- options1

```ts

type ActionType = 'login' | 'verify';

class AuthticationStrategy {
  authenticate(option: {action: ActionType}): Promise<UserProfile | undefined> {
    // 1. Try to find current user
    // 2. If found, return it
    // 3. If not found:
    // 3.1 if /login invokes this action,
    // performs login using this particular strategy
    // 3.2 if other API invokes this action, then throw 401 error
  };
}
```

- options2

```ts
class AuthticationStrategy {
  // login using this particular strategy
  login(request, response): Promise<UserProfile | undefined> {};
  // 1. Try to find current user
  // 2. If found, return it
  // 3. If not found, throw 401:
  verify(request): Promise<UserProfile | undefined> {}
}
```
