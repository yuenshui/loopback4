### Auth action

```ts
async action(request: Request): Promise<UserProfile | undefined> {
    const strategy = await this.getStrategy();
    if (!strategy) {
      // The invoked operation does not require authentication.
      return undefined;
    }

    // read the action metadata from endpoint's auth metadata like 
    // `@authenticate('strategy_name', {action: 'login'})`
    // type ActionType = 'login' | 'verify'
    const action = await this.getAction();
    if (!action) {
      throw new Error('no action specified for your endpoint')
    }
    if (!strategy[action]) {
      throw new Error('invalid strategy parameter');
    }

    let user: UserProfile;
    try {
      switch(action) {
        case 'login': user = strategy.login(request);
        case 'verify': user = strategy.verify(request);
        default: return;
      }
    } catch(err) {
      if (err) throw err;
    }

    this.setCurrentUser(user);
    return user;
  }
```
