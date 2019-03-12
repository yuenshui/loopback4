### Auth action

```ts
async action(request: Request): Promise<UserProfile | undefined> {
    const strategy = await this.getStrategy();
    // read the action metadata from endpoint's auth metadata like 
    // `@authenticate('strategy_name', {actions: 'authenticate'})`
    // type ActionType = 'authenticate' | 'ensureLoggedIn'
    const action = await this.getAction();
    if (!strategy) {
      // The invoked operation does not require authentication.
      return undefined;
    }
    if (!strategy[action]) {
      throw new Error('invalid strategy parameter');
    }

    let user;
    try {
      switch(action) {
        case 'login': user = strategy.login(request);
        case 'verify': user = strategy.verify(request);
        default: return
      }
    } catch(err) {
      if (err) throw err;
    }

    this.setCurrentUser(user);
    return user;
  }
```
