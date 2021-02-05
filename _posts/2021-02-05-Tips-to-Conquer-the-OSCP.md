---
title:     "Tips to Conquer the OSCP"
tags: [oscp,tryharder,oscpjourney]
categories: General
---

![https://raw.githubusercontent.com/jwashek/jwashek.github.io/master/img/oscp/oscp.png](https://raw.githubusercontent.com/jwashek/jwashek.github.io/master/img/oscp/oscp.png)

> *The [OSCP](https://www.offensive-security.com/pwk-oscp/) is a 100% hands-on certification where the student takes on the challenge to perform a penetration test against a network to simulate a real-world penetration test. The exam is broken down into 2 phases. The first phase, the student has 24 hours to complete the penetration test of several machines where they need to obtain at least 70 points in order to pass. The second phase, the student has another 24 hours to write a professional penetration testing report.*

## Quick Description
This post is going to serve as my experience with the OSCP -- both with the labs and exam. I'm attempting to be as detailed and thorough in my descriptions, experience, and tooling as I can to help anyone and everyone who is thinking of taking the exam.

> <u>__Note:__</u> Out of respect to Offensive Security, I cannot dive deep into the lab or exam machines, so do not expect to see specific vulnerabilities called out or any how-to's relevant to these machines. Obvious? Maybe. Needed to be said? ...also maybe.

## The Labs
Ask just about any OSCP-holder about the exam and you're more than likely to receive the same answer:  

> *"It's not about the certification, it's about the journey."*

After taking the exam, I can say that I 100% agree. The labs served as the main area of learning. Offensive Security put together a fantastic course with highly detailed videos and PDF content; however, the bulk of the learning will absolutely be "by doing" in a hands-on approach with hacking in the labs. The lab machines consisted of both Linux and Windows hosts, which gives the student a well-rounded approach in hacking different technologies.

### My Experience
Just after I received my VPN connectivity pack, I decided to go against what was recommended (i.e., read the PDF and do the course work first) and decided to go straight to the labs. Having done this, I'd recommend against doing what I did since there were certain machines that needed to be hacked in a certain order (vague, I know). Without giving too much away, there is more information contained within the PDF for tackling this.

#### My Timeline
All of that being said, I started my course in late August 2020 and started hacking in the labs the very same night. I grabbed a random machine from the list, not paying attention to what the course materials or PDF had mentioned (way to go Justin), and go figure it was one of the "Big 4" machines -- **Pain** to be exact. This was a huge **Pain** (pun intended) and hit to my pride as I, at that point, had rooted ~15 [Hack The Box](https://www.hackthebox.eu/) machines and ~15 [TryHackMe](https://tryhackme.com/) machines. At this stage, I hit a wall and just decided to take as detailed of notes that I could and move onto another machine. The next machine went much more smooth and I ended up rooting it in under 2 hours. This was a big boost in confidence and I decided to keep doing the pick-a-machine-any-machine approach.

After about 25 days of lab access, I had rooted over 30 machines, which was at least 1 machine a day. Having a little baby at home, I only had about 2-3 hours to really focus on hacking. After the little one went to bed, I switched "Dad Mode" into straight up "Hacker Mode" and went ham against the lab machines for the short amount of time that I had. This served to be an extremely serendipitous event, as I'll get to later in the post.

> Now that I earned the OSCP, I can use pretentious words like "serendipitous" in a blog post. Clearly I'm joking, people, it's apparently the best word for the occasion...

### Lab Relevance to the Exam
If I were to answer honestly, I'd say that the labs helped my mindset going into the exam. Are they relevant to what you'll see in the exam? Yes and no.

>**Yes** -- because you're going to perform the same methodology to find and exploit vulnerabilities (i.e., port/service discovery, enumeration, exploitation, post-exploitation).
>
>**No** -- because you're not going to see a one-for-one exact match between any of the labs and the exam machines. Kind of to be expected, though, right?

So, what is more relevant to the exam? Hack The Box, believe it or not, is the most relevance you'll get to the exam without having the same vulnerabilities. Overall, I felt as though the OSCP lab machines were a little on the easier side, whereas the Hack The Box machines had a lot more trolls, red-herrings, and unique initial footholds and privilege escalation paths. More specifically, if you don't feel like going through all of TJ Null's [OSCP-like machines](https://docs.google.com/spreadsheets/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/edit#gid=1839402159), your go-to should be wathching [ippsec](https://www.youtube.com/channel/UCa6eh7gCkpPo5XXUDfygQQA) videos. Every video located in his [OSCP prep](https://www.youtube.com/watch?v=2DqdPcbYcy8&list=PLidcsTyj9JXK-fnabFLVEvHinQ14Jy5tf) playlist. All of them. Definitely do not skip watching any walkthroughs since he *always* provides very valuable insight and usually provides different methods to root the machines.

## The Exam
### My Experience
Let me first preface by saying that I am one of those human creatures with some horrible luck. That tragic luck struck like Chris Brown the second I started the exam. First, I had a little connectivity issue with the VPN which just required me to scrap my connectivity pack, re-download, and try again. Easy fix (~10 min wasted).

During the buffer overflow, however, is where my problems came crashing through the door like a shark at a surfer convention. I quickly noticed that **nothing** was working. Python and Ruby -- along with any pre-installed tool written in Python or Ruby -- were just... not working. I had dependency errors that I didn't have the days leading up to the exam; I had modules and gems that mysteriously disappeared into the ether; and I could swear that I heard my VM laughing at me when trying to fix the issues.

For some odd reason the night before my exam, I had a soul-altering revelation:

> "Justin...", I said, "how about you take a snapshot in case the hell hounds are released against your whole entire existence before the exam?"

Luckily, I was able to restore from this snapshot and like some sort of witchcraft, everything worked like nothing happened. Given the troubleshooting before I restored my snapshot (i.e., attempting to fix the dependency errors, install Python modules and Ruby gems, etc.) I had wasted about 1 hour.

After the kinks were all taken out of the wrinkled garden hose that is my life, I was able to continue with the exam -- much like probably 99.9887% of exam takers that don't run into a Thanksgiving dinner of issues like I did.

### My Timeline
I started my exam at **6:00pm** on a Friday (January 29th, 2021 to be exact). As alluded to above, this was my "serendipitious" moment. It benefited me because I really only had a few hours to practice once my little one was either napping or sleeping. I was so used to forcing myself to "git gud" and hack a machine in 1-2 hours, that I was already accustomed to hacking at this time anyways. In addition, this generally gave me enough time to get 2 machines before I went to bed -- which was my hope for the exam as well. Below is a more detailed breakout of the timeline:

- **6:00pm** -- Start of exam and started my recon.
- **7:20pm** -- Okay, this was *really* the start of the exam after all the issues were sorted out. I also had to start all over with the recon after restoring my VM snapshot. What a time to be alive.
- **7:50pm** -- Rooted the Buffer Overflow machine (25 points down, 45 points to go)
- **8:00pm** -- Took a small break and went for the 10 point machine. This is where the Imposter Syndrome set in. And very, *very* hard.
- **10:00pm** -- Yes, two hours later on the EASY machine... and I still didn't get anywere. Justin, what are you doing, bro?!
- **10:30pm** -- Switched to a different machine. Fully rooted a 20 point machine (45 points down, 25 points to go).
- **10:30pm - 11:30pm** -- Went back to the 10 point machine. Guess who STILL couldn't figure it out? Yep, yours truly.
- **11:45pm - 6:15am** -- Went to sleep, but that's both a lie and an overstatement. There wasn't much "sleeping" as it mainly consisted of me laying there angry with myself over the 10 point machine. I busted out the "Critical Names to Call Yourself When You're Really Angry For Not Figuring Something Out and Laying in Bed Wide-Awake" book. Even though I had plenty of time, I was being extremely critical on myself since the "easy" machine was supposed to be, well, easy. In addition to self-inflicted verbal wounds, I started to have an existetial crisis:
- Why couldn't I figure this out?
- What am I doing with my life?
- Is this even what I'm supposed to be doing?
- Is cereal soup; why or why not?
- Just who killed JFK?!?!
- **6:30am** -- Decided to quit being so critical, suck it up, and attack the 25 point machine.
- **7:00am - 1:00pm** -- Found a good vulnerability, but otherwise got nowhere with a low-privilege shell on the hard machine. Existential Crisis Part Deux sets in. This is where I take my first real break, 0/10 would not recommend. Frequent breaks are a *must*!
- **1:30pm** -- While on break, the clouds opened and a bright white light appeared with my beautiful, angelic inner-voice saying, "Justin, you know you found this vulnerability, why not try to get a shell by chaining the `<REDACTED>` vulnerability on port `<REDACTED>` to try and enumerate the `<REDACTED>` service on port `<REDACTED>` using the `<REDACTED>` method?"
- "Oooh", thought I, "will that even work?"
- **2:00pm** -- Why, yes, yes it did work! "Justin, forget all of those terrible things I said about you..." I fully rooted the 25 point machine (70 points down, 0 points to go) with a super awesome vulnerability chain that I had never done before.
- **2:30pm** -- I fired up Metasploit (before you ask: Yes. I *100%* used Metasploit on the 10 point machine. I wasn't about to go out in defeat with the "easy" machine) and rooted the "TeN PoInT mAChiNe" (80 points down, -10 points to go).
- **2:30pm - 3:30pm** -- Took a much needed mental break and decided against going for the remaining 20 points. The reasons were twofold: (1) I needed every last minute to write as detailed of a report as I could; and (2) I knew this machine was heavy on enumeration and I needed the remaining ~2 hours to get as many screenshots as I could.

## The Report
### My Experience
I can honestly say that I underestimated the difficulty of writing a report after the 24 hour penetration test. That being said, it's just another one of those "Try Harder" moments that Offensive Security loves to sing about. Literally.

<iframe width="560" height="315" src="https://www.youtube.com/embed/t-bgRQfeW64" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### My Timeline
Since I ended my exam slightly early, I had ~2.5 extra hours on the report -- something that I later found out was much needed in my personal experience.

I started the report at about **4:00pm** on Saturday, January 30th or about 22 hours after my initial exam start time. I used up just about every last minute of this time and finished the report at **3:45pm** on Sunday, January 31st. I had 2 hours and 15 minutes to zip up my report and upload it to Offensive Security. I re-read my report (by "re-read", I actually meant to say that I "re-read it 1,000  more times, made minor adjustments, changed it back to how it was before, played with the formatting, spellchecked, then did one final proof-read"). After all was said and done with the report, I was able to have everything finalized and sent to Offensive Security for review by **4:30pm** on Sunday, January 31st.

## Tips, Tricks, and Tools
### Tips
- one
- two
- three

### Tricks
- one
- two
- three

### Tools
- tool 1
- tool 2
