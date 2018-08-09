# Git Workflow

There are two main branches; `master` and `dev`.

Branch | Purpose
-------- | ---------
`master` | Production, should never be broken.
`dev`       | Staging branch, to protect master and where PRs will be made to.
`s[#sprintnumber]-some-feature-name` | Opened and closed all the time, and merged into dev when code reviewed.

##  Normal Workflow

1. Pull latest into `dev` (make sure you're in `dev`)
2. 
```bash
# create new feature branch for sprint 0 (s0)
# for feature-name
git checkout -b s0-feature-name
```
3. Make changes pushing to your branch
4. When done open a Pull Request on github
5. Code review requires one (or more) review to go into `dev`. If a review requests changes, these changes must be committed and pushed and a new review needs to take place
6. Once this has been approved and tests are passing, merge to `dev`.

## Merge to `master`
Merges to master will take place once per week.

1. Need **two** approved reviews for merge to `master` (This part may be batched). 
2. Finally merge to `master`.