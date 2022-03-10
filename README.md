

# Requirements

- [nvm](https://github.com/nvm-sh/nvm)
- [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html)

### Permission denied for bin/setup on clean install

```bash
chmod +x ./bin/setup
```

# Installation

- `nvm use`
- `npm install`
- `npm run setup` (enter appropriate AWS keys)


# to check the aws configure

```bash
cat  ~/.aws/credentials

or

open ~/.aws/credentials
```

### API Gateway-like local dev server

To spin up a local dev server that will more closely match the API Gateway endpoint/experience:

```bash
npm run serve
```
