# Git & Github

- Basic concepts:
  - Repository (repo): a working folder
  - Commit:
    - a change of the content of a repo
    - all versions of a repo form a tree, where each node represents a commit
  - Branch:
    - a pointer to a certain commit
    - usually represented by the first 5 characters of the hash value
- How to copy a repository for your own use:
  - use `fork` instead of `clone`, creating a repository owned by you
  - `clone` your own repository to local device and edit it
  - note:
    - `fork` is the feature of Github, not Git itself
    - you need to do it on Github's webpage
- How to synchronize with other's modification on remote (e.g. the repository you fork)
  - `fetch` the remote repository to local device
  - examine whether it contains conflict with your repository
  - `merge` it with your repository
  - if you are confident that there is no conflict, you can do `pull` directly, which is `fetch + merge`
- How to contribute your update to the remote repo:
  - `fork` the remote repo and `clone`
  - edit it and `push` the change to your repo
  - create a pull request
  - wait for the owner to accept your pull request and `merge` it to the remote repo
- Working within VS Code: see https://docs.microsoft.com/en-us/learn/modules/use-git-from-vs-code/3-exercise-clone-branch

