#!/usr/bin/env bash
# install volta and make it available in the PATH for the next steps to use
curl https://get.volta.sh | bash

export VOLTA_HOME="$HOME/.volta"
export PATH=$LOCAL/bin:$VOLTA_HOME/bin:$PATH

# install node and yarn
# volta install node
# volta install yarn
