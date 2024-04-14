# RHDA Backstage Plugin

## Overview

Red Hat Dependency Analytics (RHDA) is a plugin for [Backstage](https://backstage.io/).

The RHDA plugin gives you awareness to security concerns within your software supply chain while you code your application.

The RHDA plugin uses vulnerability data sources for the most up-to-date vulnerability information available.

The application consists of three components:

- Frontend
- Backend proxying requests to the external component [rhda-executor](https://github.com/vbelouso/rhda-executor)
- `rhda-executor` provides HTML report on found vulnerabilities.

## Prerequisites

Run the `rhda-executor` container with the following command:

```shell
docker run -d -p 3200:3200 --name rhda-executor quay.io/vbelouso/rhda-executor:latest
```

## Prepare the application

Please follow the steps given in this section to setup your environment

1. Execute the following two commands to setup authentication with GitHub as well as setup your user in the catalog:

   ```shell
   cp app-config.local.yaml.template app-config.local.yaml
   cp catalog-user-info.yaml.template catalog-user-info.yaml
   ```

2. Set the correct values in `catalog-user-info.yaml` for the following
    - `<REPLACE_WITH_YOUR_GITHUB_USER_ID>`
    - `<REPLACE_WITH YOUR DISPLAY NAME>`

    _For more information on this file and its contents, please refer to <https://backstage.io/docs/features/software-catalog/descriptor-format/#kind-user>_

3. Create an OAuth app and set the following GitHub environment variables (using the newly created GitHub OAuth app):
    - `AUTH_GITHUB_CLIENT_ID`
    - `AUTH_GITHUB_CLIENT_SECRET`

    _For more information on the GitHub authentication, please refer to <https://backstage.io/docs/auth/github/provider/>_

4. Start the application
5. Sign in using GitHub
6. Choose the `rhda-component` component, then click on `RHDA` tab to retrieve a vulnerabilities report.
