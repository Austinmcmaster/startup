# Notes for CS260.

Accessible for midterm and final of CS260. Very important to keep file up to date.

[README.md Link](/README.md)

## Git/GitHUB

All of the skills mentioned within this lesson, have been used substantially througout my previous internship and other classes. So not exactly a lot of learning that took place. Very important to keep practicing these concepts though.

##
AWS Skills
➜  ssh -i [key pair file] ubuntu@[ip address]

## DNS Setup
http://webprogramming260austin.click

## Caddy
myfunkychickens.click {
   root * /usr/share/caddy
   file_server
   header Cache-Control no-store
   header -etag
   header -server
   }


startup.myfunkychickens.click {
   reverse_proxy * localhost:4000
   header Cache-Control no-store
   header -server
   header -etag
   header Access-Control-Allow-Origin *
}

simon.myfunkychickens.click {
   reverse_proxy * localhost:3000
   header Cache-Control no-store
   header -server
   header -etag
   header Access-Control-Allow-Origin *
}