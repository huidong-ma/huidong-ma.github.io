#!/usr/bin/env bash

export PATH="/opt/homebrew/opt/ruby@3.1/bin:$PATH"
exec bundle exec jekyll liveserve
