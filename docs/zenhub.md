# Zenhub and Github

Zenhub is basically just a fancy wrapper over Github that allows us to do the agile things that are required for cs4920. Notably it allows the creation of specialised issues that are `Epics`, and for our own purposes I've also created another label called `Stories` which we'll also use.

## Workflow

Every sprint (assigned under milestones) we'll create issues relating to user `Stories`, and `Epics` that need to be completed. Each issue tackling a `Story` should be added as a dependency of that `Story`. Equally, each `Story` that makes up an `Epic` should be added as a dependency of that `Epic`.

This interconnectedness will allows us to properly track the progress and development of various projects, just by looking at the Zenhub board.

All active issues should be connected to a sprint (milestone) at the minimum.

## Labels

Every new issue that is created should have some reference to a user `Story` issue, but should also include other semantic labels. Use the most appropriate to add more data to an issue.

The following labels currently exist:

#### Special Labels
1. Epic
2. Story

#### Normal Labels
1. Security
2. Feature
3. Bug
4. High Priority
5. Help Wanted

## Pull Requests

Pull Requests should always point to an issue. This means that when your PR is approved and merged your issue will be automatically resolved. You can do this directly in the PR description; "Fixes #3", or by using Zenhub to reference the issue. Either way, when the PR is lodged, the issue, and PR will appear in code review, and when merged, both will be closed.

## Further Information

Further information is available about [Zenhub here](https://help.zenhub.com/support/home).

