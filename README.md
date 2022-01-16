# ↪️ Over There

This is an Azure Functions app to just redirect any web request that hits it to
a different hostname. Useful for redirecting apex domains to `www`, or any
other "entire hostname" redirects you might need.

## Usage

### Prerequisites

You'll need all the basics set up before anything else:

1. A [Microsoft Azure](https://azure.microsoft.com) Account
2. An Azure Resource Group
3. An Azure Storage Account for the function

### Deploying the Function

Once you have an Azure Storage Account set up, you can create a function app
for each domain you want to redirect.

```
$ az functionapp create \
    --disable-app-insights \
    --resource-group MyResourceGroupName \
    --consumption-plan-location canadacentral \
    --runtime node \
    --runtime-version 14 \
    --functions-version 3 \
    --name MyFunctionAppName \
    --storage-account MyStorageAccountName
```

Then download the latest version from the [Github releases][releases], and
deploy it:

```
$ az functionapp deployment source config-zip \
    -g MyResourceGroupName \
    -n MyFunctionAppName \
    --src overthere-1.0.0.zip
```

Finally, set `TARGET_HOSTNAME` in the App Settings to the target domain we want
this app to redirect to.

```
$ az functionapp config appsettings set \
    --name MyFunctionAppName \
    --resource-group MyResourceGroupName \
    --settings "TARGET_HOSTNAME=www.example.com"
```

[releases]: https://github.com/alexblackie/OverThere/releases

### A Note on TLS and Domains

The expected use case of this function is to serve as a CDN origin or to be
otherwise reverse-proxied. For example, you could use Azure FrontDoor or an
external CDN provider.

The Function is built to not care about the incoming hostname, so if you do
"full" layer-7 proxying, you can just hit the function app's default subdomain
and everything will Just Work™.

## Development

You'll need to install the [Azure Functions Core Tools][functools]. We're
targetting **v3.0** on this project.

Then you can run a local dev server with:

```
$ func start
```

[functools]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local
