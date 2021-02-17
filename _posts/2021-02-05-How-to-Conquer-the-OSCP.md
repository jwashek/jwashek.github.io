---
title: "How to: Conquer the OSCP"
tags: [oscp,tryharder,conquer]
categories: [Certifications]
---

![https://raw.githubusercontent.com/jwashek/jwashek.github.io/master/img/oscp/oscp.png](https://raw.githubusercontent.com/jwashek/jwashek.github.io/master/img/oscp/oscp.png)

## Introduction
The [OSCP](https://www.offensive-security.com/pwk-oscp/) is a 100% hands-on certification where the student takes on the challenge to perform a penetration test against a network to simulate a real-world penetration test. Before the exam is taken, the student has either 30/60/90 days of lab access--depending on what was purchased--to practice their skills in a controlled lab network. These lab machines are intended to get the student's feet wet into what assessing   

The exam is broken down into 2 main phases. In the first phase the student has 24 hours to perform the assessment portion, or penetration test, where they're required to hack into 5 machines and obtain at least 70 points in order to pass. These points are based upon how many objectives are captured during the assessment. The machines are broken down as follows:

- Two 25-point machines (hard)
  - On one machine the student has to perform a [buffer overflow](https://owasp.org/www-community/attacks/Buffer_overflow_attack) against a vulnerable application.
  - On the other machine the student will have to obtain a root/System shell on either a Linux or Windows based host and complete the objective(s) found in the Rules of Engagement letter.
- Two 20-point machines (medium)
  - In both machines the student will have to obtain a root/System shell on either a Linux or Windows based host and complete the objective(s) found in the Rules of Engagement letter.
- One 10 point machine (easy)
 - In this machine the student will have to obtain a root/System shell on either a Linux or Windows based host and complete the objective(s) found in the Rules of Engagement letter.


In the second phase of the exam the student has another 24 hours, after the assessment portion has ended, to write a professional penetration test report. In essence, this report should contain enough information to where a tech savvy reader could reproduce the steps from the student's descriptions. Additionally, the report *must* contain proof that the objectives were successfully obtained from each machine.

## How To Conquer:
### Your Lab Time
Ask just about any OSCP-holder about the exam and you're more than likely to receive the same answer:  

> *"It's not about the certification, it's about the journey."*

The labs are no different, i.e., they're not meant to be done as trophies or as a get-as-many-machines-as-you-can approach. Rather, they should serve as the main area of learning. This section was put first because it truly is the most important part of the journey. Think of the exam as the road and the labs as the car. The road is going to seem much more bumpy, curvy, and rough if you didn't test drive the car. The labs are there for you to practice and test what you've learned. Be sure to not waste *any* time, whether you have 30/60/90 day lab access.

#### Lab Tips:
- If you have experience in [CTFs](https://cybersecurity.att.com/blogs/security-essentials/capture-the-flag-ctf-what-is-it-for-a-newbie) (<b><u>Note:</u></b> This includes resources like [Hack The Box](https://www.hackthebox.eu) and [TryHackMe](https://tryhackme.com/)):
  - Jump in the labs as soon as possible.
  - Regardless of your confidence level, try to learn something from every machine.
  - Try to avoid using [MetaSploit](https://www.metasploit.com/) as much as possible, but don't skip it entirely--it is still an incredibly useful and powerful tool. 
  - Attempt the machines in different ways. If you found a vulnerability and exploited it using MetaSploit, try to hack the machine without it or by finding a new vulnerability.
- If you have no experience in CTFs:
  - Do not just breeze through the course videos and PDF. They contain a great amount of content and have exercises for you to follow which help you to reinforce and retain the knowledge you gained throughout.
  - Complete all the course PDF exercises. Not only is this good experience, if you add the writeups into your report, you'll get an extra 5 points credited to your exam. This may not seem like a lot, but imagine having not done the exercises, getting stuck and running out of time, only to fail the exam by 5 points.  
  - I cannot recommend [TryHackMe](https://tryhackme.com/) enough. There are different [hacktivities](https://tryhackme.com/hacktivities) which are like mini practical courses which help you to understand the concepts you will be using during the exam.
  - Get very familiar with privilege escalation in both Linux and Windows hosts. There are tons of great resources, but if you ask me, I am a firm believer in "learning by doing". The only way to get exposure to a broad range of techniques is to practice different machines.

### Your Methodology
The methodology you use during your exam is going to make or break your experience. I would recommend finding what works best for you and tweaking the methodology to fit your personal approach to hacking a target. Practicing this methodology on as many machines as you can will only help to solidify your approach and will start to become muscle memory. A typical methodology would involve **Discovery**, **Assessment**, **Exploitation**, and **Reporting**, all of which will be used extensively during your exam. 

![https://raw.githubusercontent.com/jwashek/jwashek.github.io/master/img/oscp/pentest-methodology.png](https://raw.githubusercontent.com/jwashek/jwashek.github.io/master/img/oscp/pentest-methodology.png)

xxxxxxxxxxx

#### Methodology Tips:
- Get comfortable with your methodology
- Take detailed notes throughout
  - If it helps, have a template where you can just copy/paste your notes. The below example is typically my template that I use when hacking machines on Hack The Box, TryHackMe, or doing CTFs:
  ```bash
  k
  k
  k
  k
  k
  k
  k
  k
  k
  k
  k
  k
  k
  k
  k
  k
  ``` 

### Your Exam
#### Exam Tips:
x

### Your Report
#### Report Tips:
x

### Your Results
#### Pass
x

#### Fail
x
