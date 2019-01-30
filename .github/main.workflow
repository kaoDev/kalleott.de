workflow "Publish on push" {
  on = "push"
  resolves = [
    "Publish",
  ]
}

action "install" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "test" {
  uses = "borales/actions-yarn@master"
  needs = ["install"]
  args = "test"
}

action "master" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  needs = ["test"]
  args = "branch master"
}

action "build" {
  uses = "borales/actions-yarn@master"
  needs = ["master"]
  args = "build"
}

action "Publish" {
  uses = "netlify/actions/cli@master"
  needs = ["build"]
  secrets = ["NETLIFY_AUTH_TOKEN", "NETLIFY_SITE_ID"]
  args = "deploy --dir=public --prod"
}
