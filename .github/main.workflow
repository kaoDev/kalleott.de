workflow "New workflow" {
  on = "push"
  resolves = ["Publish"]
}

action "yarn install" {
  uses = "./actions/yarn"
  args = "install"
}

action "test" {
  uses = "./actions/yarn"
  needs = ["yarn install"]
  args = "test"
}

action "build" {
  uses = "./actions/yarn"
  needs = ["test"]
  args = "build"
}

action "Publish" {
  uses = "netlify/actions/build@master"
  needs = ["build"]
  secrets = ["GITHUB_TOKEN", "NETLIFY_SITE_ID"]
}
