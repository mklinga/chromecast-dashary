# Chromecast - däsäri

I got bored of looking at the chromecast default screen so I decided to do something better.

## Setup

For now, the whole system runs in the local network so you need to [register](https://developers.google.com/cast/docs/registration) your application (follow the *custom receiver* hints) and set your own APP_ID on the sender if you want to use this project on your own system. Since I am running the receiver on the internal network, I used http://192.168.1.243:8080 for the *Receiver Application URL*.

### Sender

I use [http-server](https://www.npmjs.com/package/http-server) and [local-ssl-proxy](https://www.npmjs.com/package/local-ssl-proxy) for serving the application (chromecast requires sender to use https protocol).

```bash
$ cd sender
$ http-server -p 9000
$ local-ssl-proxy --source 9001 --target 9000
```

### Receiver

```bash
$ cd receiver
$ http-server -p 8080
```

## Run

With both services running, you can now visit [https://192.168.1.243:9001/](https://192.168.1.243:9001/) and start casting!


## TODO

CC images, maybe let user to type in a tag etc. https://api.creativecommons.engineering/#
