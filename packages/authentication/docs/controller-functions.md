## Endpoint definitions

The following decorated controller functions demos the endpoints described at the beginning of markdown file [authentication-system](../authentication-system.md).

Please note how they are decorated with `@authenticate()`, the syntax is:
`@authenticate(<strategy_name>, {action: <action_name>, session: <enabled_or_not>})`

- /login

```ts
class UserController {
  @post('/login', ...APISpec)
  login() {
    // static route
  }
}
```
- /loginWithFB

```ts
class UserController {
  @post('/loginWithFB', ...APISpec)
  @authenticate('oath2.fb', {action: 'login', session: false})
  loginWithFB() {}
}
```

- /loginWithGoogle

```ts
class UserController {
  @post('/loginWithGoogle', ...APISpec)
  @authenticate('oath2.google', {action: 'login', session: true})
  loginWithGoogle() {}
}
```

- /loginWithLocal

```ts
class UserController {
  @post('/loginWithLocal', ...APISpec)
  @authenticate('local', {action: 'login', session: false})
  loginWithLocal() {}
}
```

- /orders

```ts
class UserController {
  constructor(
    @inject('CURRENT.USER') user: User;
  )

  @post('/orders', ...APISpec)
  @authenticate('jwt', {action: 'verify'})
  orders() {
    const id = this.user.id;
    return await this.userRepo(id).orders();
  }
}
```
