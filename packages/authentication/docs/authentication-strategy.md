### Auth strategy class

There are two flavors of defining the strategy interface. One is having only one function `authenticate` which takes in the action type and handles login and verify accordingly. The other one is having two functions `login` and `verify`.

After having the sync up meeting with Raymond we agreed on flavor #1. While when we were writing the pseudo code for strategies + services, we felt the word `authenticate` is very misleading and switched back to having two separate functions to distinguish between the login and verify flow.

A summary of the pros/cons of each flavor will be provided later. Discussion/feedback are welcomed. Currently this PR uses flavor #2.

- flavor 1

```ts

type ActionType = 'login' | 'verify';

class AuthticationStrategy {
  authenticate(option: {action: ActionType}): Promise<UserProfile | undefined> {
    // 1. Try to find current user
    // 2. If found, return it
    // 3. If not found:
    // 3.1 if /login invokes this action,
    //      performs login using this particular strategy
    // 3.2 if other API invokes this action, then throw 401 error
  };
}
```

- flavor 2

```ts
class AuthticationStrategy {
  login(request, response): Promise<UserProfile | undefined> {};

  verify(request): Promise<UserProfile | undefined> {
    // 1. Try to find current user
    // 2. If found, return it
    // 3. If not found, throw 401:
  }
}
```
