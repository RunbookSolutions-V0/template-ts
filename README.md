# Runbook Solutions Microservice Template [Typescript]
A Typescript template used for creating microservices by Runbook Solutions


# Github Actions
The following github actions are included:
| When | Github Action | Description |
| A Release is Published | Build and Publish Service Package | Builds the helper npm package specific to this microservice. |
| A Release is Published | Deploy Infrastructure | Deployes the microservice to AWS. |
| A push is made to `main` | Release Please | Manage the creation of PR's related to Releases; and publishes releases when its PR's are merged |
| A PR is opened, synchronize, or reopened | Test | Runs the included tests adding the output as a comment to the PR |
| A PR is opened, synchronize, or reopened | CDK DIFF | Generates a report on changes to Infrastructure |