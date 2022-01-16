# aBadMorning.
So, here's a little story.
Not too long ago a friend of mine decided to be funny and have a laugh on my expense.
While it was all in good fun, I've decided to do a weird prank and send him everyday a SMS message that will remind him when his favourite football team lost.

## How does it work?
It uses the football-api from RapidAPI cataloge and Vonage SMS service to send a message.

To configure it you'll need to change the .env file which should looke like so:
```
API_KEY=
API_HOST=
VONAGE_KEY=
VONAGE_SECRET=
VICTIM=
```

* Victim is the end user phone number.

It should be used with any cloud service that offer cron-style app launching. (I used AWS)