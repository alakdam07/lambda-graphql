

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

### Test your functions with Jest

Jest is installed as the testrunner. To create a test, co-locate your test with the file it's testing
as `<filename>.test.ts` and then run/watch tests with:

```bash
npm test

or

 npm run test:watch
```

### Adding new functions/files to Webpack

When you add a new function to your serverless config, you don't need to also add it as a new entry
for Webpack. The `serverless-webpack` plugin allows us to follow a simple convention in our `serverless.yml`
file which is uses to automatically resolve your function handlers to the appropriate file:

```yaml
functions:
  hello:
    handler: src/hello.default
```

As you can see, the path to the file with the function has to explicitly say where the handler
file is. (If your function weren't the default export of that file, you'd do something like:
`src/hello.namedExport` instead.)

### Keep your lambda functions warm

Lambda functions will go "cold" if they haven't been invoked for a certain period of time (estimates vary, and AWS doesn't offer a clear answer). From the [Serverless blog](https://serverless.com/blog/keep-your-lambdas-warm/):

> Cold start happens when you execute an inactive (cold) function for the first time. It occurs while your cloud provider provisions your selected runtime container and then runs your function. This process, referred to as cold start, will increase your execution time considerably.

A frequently running function won't have this problem, but you can keep your function running hot by scheduling a regular ping to your lambda function. Here's what that looks like in your `serverless.yml`:

```yaml
custom:
  warmup:
    enabled: true
    events:
      - schedule: rate(5 minutes)
    prewarm: true
    concurrency: 2
```

The above config would keep all of your deployed lambda functions running warm. The `prewarm` flag will ensure your function is warmed immediately after deploys (so you don't have to wait five minutes for the first scheduled event). And by setting the `concurrency` to `2`, we're keeping two instances warm for each deployed function.

Under `custom.warmup`, you can set project-wide warmup behaviors. On the other hand, if you want to set function-specific behaviours, you should use the `warmup` key under the select functions. You can browse all the options [here](https://www.npmjs.com/package/serverless-plugin-warmup#configuration).

Your handler function can then handle this event like so:

```javascript
const myFunc = (event, context, callback) => {
  // Detect the keep-alive ping from CloudWatch and exit early. This keeps our
  // lambda function running hot.
  if (event.source === 'serverless-plugin-warmup') {
    // serverless-plugin-warmup is the source for Scheduled events
    return callback(null, 'pinged');
  }

  // ... the rest of your function
};

export default myFunc;
```

Copying and pasting the above can be tedious, so we've added a higher order function to wrap your run-warm functions. You still need to config the ping in your `serverless.yml` file; then your function should look like this:

```javascript
import runWarm from './utils';

const myFunc = (event, context, callback) => {
  // Your function logic
};

export default runWarm(myFunc);
```

### Pruning old versions of deployed functions

The Serverless framework doesn't purge previous versions of functions from AWS, so the number of previous versions can grow out of hand and eventually filling up your code storage. This starter kit includes [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin) which automatically prunes old versions from AWS. The config for this plugin can be found in `serverless.yml` file. The defaults are:

```yaml
custom:
  prune:
    automatic: true
    number: 5 # Number of versions to keep
```


## Environment Variables

If you have environment variables stored in a `.env` file, you can reference them inside your `serverless.yml` and inside your functions. Considering you have a `NAME` variable:

In a function:

```node
process.env.NAME
```

In `serverless.yml`:

```yaml
provider:
  name: ${env:NAME}
  runtime: nodejs14.x
```

You can check the documentation [here](https://www.npmjs.com/package/serverless-dotenv-plugin).

## Deploy

Assuming you've already set up your default AWS credentials (or have set a different AWS profile via [the profile field](serverless.yml#L25)):

```bash
npm deploy
```

`npm deploy` will deploy to "dev" environment. You can deploy to `stage` or `production`
with:

```bash
npm deploy:stage

# -- or --

npm deploy:production
```

