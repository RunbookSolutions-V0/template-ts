# Runbook Solutions Microservice Template [Typescript]
A Typescript template used for creating microservices by Runbook Solutions

# How to Use

1) Create a new repository using this repository as a template.
1) Install NPM packages
    `npm install`
1) Create a new branch 
    `git branch -m initial-config`
1) Edit the package.json file to match the new repository.
    ```json
    {
        // Edit this to match the name of the repository (microservice)
        "name": "template-ts",
        // NEVER edit this value. It will be handled by github actions.
        "version": "0.0.0",
        // The description of the microservice
        "description": "RunbookSolutions MicroService Template [TypeScript]",
        // Github Organization or User
        "author": "Runbook Solutions",
        // License of the microservice
        "license": "UNLICENSED",
        // Home Page of the microservice or Github Repository
        "homepage": "https://github.com/RunbookSolutions/template-ts#readme",
        "repository": {
            "type": "git",
            // Update to match github repository
            "url": "git+https://github.com/RunbookSolutions/template-ts.git"
        },
        "bugs": {
            // Update to match github repository
            "url": "https://github.com/RunbookSolutions/template-ts/issues"
        },

        // No reason to edit anything else manually.
    }
    ```
1) [Define Infrastructure](#define-infrastrucute)
    1) [Lambda Code](#lambda-code)
1) [Define Logic](#define-logic)
1) [Define Tests](#define-tests)
1) Run Tests `npm run test`
1) [Commit Changes](#commit-changes)
1) Follow [Github Workflow](#github-workflow)


## Define Infrastructure
AWS Infrastructure for the microservice is defined in `infrastructure.ts`

Each stack the microservice deploys should be defined under `./stacks` and then included in `./stacks/index.ts`.

### Lambda Code
While Lambda Functions are considered infrastructure, the code running them should be stored in `./src/lambda` allowing them easy access to other logic for the service.

## Define Logic
Logic shared between Lambda Functions should be stored in the `./src` directory. This allows the defined Github Actions to automatically create a npm package so other microservices use logic controlled by this microservice.

## Define Tests
Tests for your infrastructure and logic should be stored in `./test`.

## Commit Changes

When commiting changes follow the [Convential Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure that the [Github Workflow](#github-workflow) works as intended.

Commit Message Format:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The most important line is `<type>[optional scope]: <description>` and would be used in the command line as follows: `git commit -m <type>[optional scope]: <description>`

| Commit Message | Version Change |
| --- | --- |
| **fix**`[optional scope]: <description>` | `v0.0.0` -> `v0.0.1` |
| **feat**`[optional scope]: <description>` | `v0.0.1` -> `v0.1.0` |
| `<type>[optional scope]`**!**`: <description>` | `v0.1.1` -> `v1.0.0`

## Github Workflow

**Requirements and Assumptions:**
- The repository has a policy that prevents any pushes directly to the default branch
- The following Secrets are configured for the Repository (or Organization)
    - `AWS_GITHUB_DEPLOY_ROLE` The Role ARN Github Actions should assume to deploy the Infrastructure
    - `AWS_GITHUB_DIFF_ROLE` The Role ARN Github Actions should assume to preform a `cdk diff` for Pull Requests

Assuming the requirements are met the workflow proceedes as follows:
- A PR request is opened, synchornize (new commits to the branch), or reopened
    - `npm run test` is run, results posted as a comment to the PR
    - `cdk diff` is run, results posted as a comment to the PR
- The PR is merged
    - [Release Please](https://github.com/google-github-actions/release-please-action) checks the commit messages and preforms any versioning required
        - A new PR is created if a new version is required
        - *NOTE: Any merges prior to the merge of the `Release Please PR` being merged will be consolidated into a single `Release Please PR`*
- The `Release Please PR` is merged
    - The Infrastructure is deployed
    - The microservice NPM package is built and published to github

# Github Actions
The following github actions are included:

| Trigger | Github Action | Description |
| --- | --- | --- |
| A Release is Published | Build and Publish Service Package | Builds the helper npm package specific to this microservice. |
| A Release is Published | Deploy Infrastructure | Deployes the microservice to AWS. |
| A push is made to `main` | Release Please | Manage the creation of PR's related to Releases; and publishes releases when its PR's are merged |
| A PR is opened, synchronize, or reopened | Test | Runs the included tests adding the output as a comment to the PR |
| A PR is opened, synchronize, or reopened | CDK DIFF | Generates a report on changes to Infrastructure |