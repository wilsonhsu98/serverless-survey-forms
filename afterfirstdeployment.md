# After first deployment

## Sync meta to S3 regularly

The project enabled plugin [serverless-meta-sync](https://github.com/serverless/serverless-meta-sync) to sync meta data across teams via S3 bucket.

When you run it with a stage or a region ```-s dev -r ap-northeast-1```, this plugin will first find or create an S3 bucket using the credentials you have set for that stage, then sync the variables files you have locally with the ones on the S3 bucket. For example, running ```sls meta sync -s dev``` will sync your project's s-variables-dev.json with the s-variables-dev.json located on the S3 bucket.

You should regularly sync meta in these two conditions:

* Right after project initialization.
* Everytime you set or unset variables to meta.

## Manipulate to s-resources-cf.json

If you add any new resource, please execute:

```
sls resources deploy
```

## Manipulate to s-function.json

If you add or modify any new API endpoint, please execute:

```
sls endpoint deploy -a
```

## Manipulate to Lambda functions

If you add or modify any new Lambda function, please execute:

```
sls function deploy
```

## Manipulate Static Website Resources 

If you add or modify any static website resources, please execute:

```
# go to web folder
cd web
# execute deploy script
npm run deploy
# deploy static web resources
sls client deploy -s [stage]
```
