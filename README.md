# SendGrid Command Line Utility
## Introduction
Command line utility for sending emails with SendGrid.
Really useful if you want to have a feedback system that can be run by the command line. Particularly with to check the sanity of certain cron jobs, testing digests or site uptests.
## Installation
1. Install node.js (tested w/ 4.3.0)
2. setx /m SENDGRID_API_KEY 'MY KEY'
3. run
```sh
# node end_email.js to subject content
node end_email.js dest@domain.com "Title" "Sup mate"
```
4. [Optional] setx /m SENDGRID_DIR "this dir".
        Example: setx /m SENDGRID_DIR "c:\node\sendgrid"

## Test
```sh
# next line is optional in case SENDGRID_API_KEY env var is not set
set SENDGRID_API_KEY=SGmykey
node send_email.js myEmail@domain.com prova default_content_echo
```

## TODO
1. Make it a module

## Tested with those versions
* node v4.3.0
* npm 3.7.2
