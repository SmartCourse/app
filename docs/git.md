# Git Workflow

There are two main branches; `master` and `dev`.

Branch | Purpose
-------- | ---------
`master` | Production, should never be broken.
`dev`    | Staging branch, to protect master and where PRs will be made to.
`s[#]-some-feature-name` | Opened and closed all the time, and merged into dev when code reviewed.

##  Normal Workflow

Before starting a new issue, pull latest into `dev` (make sure you're in `dev`).

```bash
$ git checkout dev
$ git fetch && git pull
# create new feature branch for sprint 0 (s0)
$ git checkout -b s0-feature-name
```
1. Make changes pushing to your branch
2. When done open a Pull Request on github
3. Merge requires one (or more) approved reviews to go into `dev`. If a review requests changes, these changes must be committed and pushed and a new review needs to take place
4. Once this has been approved _and_ tests are passing, merge to `dev`.

## Merge to `master`
Merges to master will take place once per week for all issues that have made into `dev` for that sprint..

1. Need **two** approved reviews for merge to `master`
2. Finally merge to `master`.