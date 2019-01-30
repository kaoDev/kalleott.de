workflow "New workflow" {
  on = "push"
  resolves = [
    "Publish",
  ]
}

action "install" {
  uses = "borales/actions-yarn@master"
  needs = ["master"]
  args = "install"
}

action "test" {
  uses = "borales/actions-yarn@master"
  needs = ["install"]
  args = "test"
}

action "build" {
  uses = "borales/actions-yarn@master"
  needs = ["test"]
  args = "build"
}

action "Publish" {
  uses = "netlify/actions/build@master"
  needs = ["build"]
  secrets = ["GITHUB_TOKEN", "NETLIFY_SITE_ID"]
}

action "master" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  args = "branch master"
}
