Simple website using Jekyll and Sass. There is also a CI script to build direct in an AWS S3 bucket. 
https://jekyllrb.com/

## Install Jekyll 
Setting up your dev environment
- $ gem install jekyll -g

## Project structure
destination: public (final code)

source: src

Final code will be in the public/ folder

Configuration files will be in the project root

## Run project locally
- $ bundle exec jekyll serve

## Build site
- $ jekyll build

## Stop a jekyll local server
- $ ps aux |grep jekyll |awk '{print $2}' | xargs kill -9