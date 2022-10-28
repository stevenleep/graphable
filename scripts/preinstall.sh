#!/usr/bin/env bash

setup_git_extend() {
    # ref: https://github.com/gitster/git/commit/9b25a0b52e09400719366f0a33d0d0da98bbf7b0
    git config --local include.path ../scripts/.gitconfig
}

cat <<EOF
Git config extended! 
Use custom .gitconfig file extension git config.
EOF

setup_git_extend

cat <<EOF
Register .gitconfig extension successfully! 
You can customize the Git command in the .gitconfig, such as configured GIT aliases
EOF