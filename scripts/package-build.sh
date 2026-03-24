#!/usr/bin/env bash

# Preload base bash configuration and functions
source bgord-scripts/base.sh
setup_base_config

OUTPUT_DIRECTORY="dist"

step_start "Directory clear"
rm -rf tsconfig.tsbuildinfo
rm -rf $OUTPUT_DIRECTORY
step_end "Directory clear"

step_start "Package build"
bunx tsc
step_end "Package build"
