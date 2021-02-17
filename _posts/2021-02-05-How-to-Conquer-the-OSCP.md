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
<b>If you have experience in [CTFs](https://cybersecurity.att.com/blogs/security-essentials/capture-the-flag-ctf-what-is-it-for-a-newbie)</b>:
- Jump in the labs as soon as possible.
- Regardless of your confidence level, try to learn something from every machine.
- Try to avoid using [MetaSploit](https://www.metasploit.com/) as much as possible, but don't skip it entirely--it is still an incredibly useful and powerful tool. 
- Attempt the machines in different ways. If you found a vulnerability and exploited it using MetaSploit, try to hack the machine without it or by finding a new vulnerability.

<b>If you have no experience in CTFs:</b>
- Do not just breeze through the course videos and PDF. They contain a great amount of content and have exercises for you to follow which help you to reinforce and retain the knowledge you gained throughout.
- Complete all the course PDF exercises. Not only is this good experience, if you add the writeups into your report, you'll get an extra 5 points credited to your exam. This may not seem like a lot, but imagine having not done the exercises, getting stuck and running out of time, only to fail the exam by 5 points.  
- I cannot recommend [TryHackMe](https://tryhackme.com/) enough. There are different [hacktivities](https://tryhackme.com/hacktivities) which are like mini practical courses which help you to understand the concepts you will be using during the exam.
- Get very familiar with privilege escalation in both [Linux](https://www.udemy.com/course/linux-privilege-escalation/) and [Windows](https://www.udemy.com/course/windows-privilege-escalation/) hosts. There are tons of great resources, but if you ask me, I am a firm believer in "learning by doing". The only way to get exposure to a broad range of techniques is to practice different machines.
- Use supplemental learning like Hack The Box, TryHackMe, [CyberSecLabs](https://www.cyberseclabs.co.uk/), [Root-Me](https://www.root-me.org/?lang=en), etc. where you get to practice hacking machines. 
- **Do not** only use the OSCP labs. They're great, don't get me wrong, but broadening your scope will help you become more well-rounded and see different vulnerabilities and paths to exploitation.

### Your Methodology
The methodology you use during your exam is going to make or break your experience. I would recommend finding what works best for you and tweaking the methodology to fit your personal approach to hacking a target. Practicing this methodology on as many machines as you can will only help to solidify your approach and will start to become muscle memory. A typical methodology would involve **Discovery**, **Assessment**, **Exploitation**, and **Reporting**, all of which will be used extensively during your exam. 

![https://raw.githubusercontent.com/jwashek/jwashek.github.io/master/img/oscp/pentest-methodology.jpg](https://raw.githubusercontent.com/jwashek/jwashek.github.io/master/img/oscp/pentest-methodology.jpg)

Chances are high if you've participated in any CTFs that you've used a methodology similar to the above--maybe without even knowing it. You start out with finding what machine you want to hack (Host Discovery), run an **nmap** scan with default scripts (`-sC` option) and service detection (`-sV` option) against the target (Port Scanning, Host Fingerprinting, & Service Fingerprinting), then you run an enumeration tool against the service (Example:  directory bruteforcing with tools like [Gobuster](https://github.com/OJ/gobuster) or [dirsearch](https://github.com/maurosoria/dirsearch)) (Vulnerability Research and Cross Reference & Attack Method Selection), and test for any exploits you found along the way (Vulnerability Confirmation & Execution). Understanding your methodology and putting it to practice will help your assessment phase to be more efficient and organized. 

#### Methodology Tips:
- Get comfortable with your methodology. If it helps to create a [mindmap](https://www.xmind.net/), go for it! Sometimes visualizing the steps and referencing any notes you took along the way help you to stay on track during the exam.
- Practice, practice, practice. It always helps to put your methodology to practice in CTFs and other hacking challenge labs before integrating it for the first time during the exam. The more you do it, the better you'll become at it. This will make for a smoother transition during the exam.
- Make changes. Any methodology shouldn't be viewed as the only way to test a machine or network. Find what works best for you and build off of that before your exam date. There's no sense in using a methodology that doesn't mesh with your personal approach to testing.

### Your Note-taking
Note-taking is unfortunately one of those concepts that get lost in the excitement of finding and exploiting vulnerabilities. However, note-taking is *crucial* for your success during the exam. If it helps, use a mindmap like mentioned above or any other note-taking application that you're comfortable with. OneNote, EverNote, KeepNote, Cherrytree... one is not better than the other if it doesn't work the way you need it to. Find a note-taking application that you're comfortable with and use it heavily during your lab time and supplemental learning. My personal preference is [Joplin](https://joplinapp.org/) due to it's support of markdown, ease of use, and organizational capabilities. The main point here is simple:  don't skip this step -- especially for the exam. If your notes are detailed enough and your VPN access runs out, you shouldn't need to go back into a machine and take additional screenshots or grab extra proof, it should all be there in your notes already.

#### Note-taking Tips:
- Create a template for your notes to follow along with your methodology. My personal template that I use for hacking challenges is simple and looks something like the following:
  ```
  # Enumeration
  ## Nmap Results
  <add in nmap results here>
  
  ## Service 1:  HTTP (port 80)
  <describe any versions or applications running on this service>
  
  ## Service 2:  SMB (ports 139/445)
  <describe any versions or potential findings>
  
  ## Service 3:  ...
  <describe any versions or potential findings>
  
  # Exploitation
  ## HTTP
  ### Finding 1
  <describe the finding and how you can potentially get a shell>
  
  ### Finding 2
  <describe the finding and how you can potentially get a shell>
    
  ## SMB
  ### Finding 1
  <describe the finding and how you can potentially get a shell>
  
  ### Finding 2
  <describe the finding and how you can potentially get a shell>
  
  # Post-Exploitation
  ## Enumeration
  <describe anything interesting that you found while enumerating on the machine>
  
  ### Finding 1
  <describe this finding and if it has the potential of escalating your privileges>
  
  ### Finding 2
  <describe this finding and if it has the potential of escalating your privileges>
  
  ## Privilege Escalation
  ### Finding user.txt
  <describe what vulnerability you exploited to find the user.txt
   
  ### Finding root.txt
  <describe the method, service, or vulnerability you exploited to escalate your privileges to a root/System user>
  ``` 
- Take *tons* of notes. The more notes you take the better. This includes both before and during your exam. Remember, the more detailed your notes are, the easier the report writing phase will be for you.


### Your Exam
Now comes the fun part: the exam. Is it intimidating? Yes. Is it impossible? Absolutely not. How you conquer the OSCP weighs heavily on your preparation and how well you did your preparation. This much is obvious, but what what may not be as obvious is your mindset going into the exam. Be as confident in your skillset,
lab preparation, methodology, and note-taking abilities as you possibly can.

> *"Every battle is won or lost before it is ever fought. - Sun Tzu"*

#### Exam Tips:
**Before the Exam**
- If you're not already subscribed, subscribe to Hack The Box so you have access to the retired machines. After this, make sure you add every machine you can from TJ Null's [OSCP-like machines](https://docs.google.com/spreadsheets/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/edit#gid=1839402159). Don't be afraid if you have to read walkthroughs or watch video walkthroughs on some of the machines. Think of this whole process as the journey instead of just getting the certification.
  - "Practice" the exam. Grab 4 random machines from the list at a time, give yourself 24 hours to try and hack into them, and practice writing a report on them. Seems like overkill, but it will *really* help you during exam time since you've done it several times already.
- As a sort of follow-up to the last point, watch *every* video from ippsec's [OSCP Prep](youtube.com/watch?v=2DqdPcbYcy8&list=PLidcsTyj9JXK-fnabFLVEvHinQ14Jy5tf) playlist.
- Specifically to Buffer Overflow: 
  - Watch The Cyber Mentor's [Buffer Overflows Made Easy](https://www.youtube.com/watch?v=qSnPayW6F7U&list=PLLKT__MCUeix3O0DPbmuaRuR_4Hxo4m3G) playlist.
  - Do the [Buffer Overflow Prep](https://tryhackme.com/room/bufferoverflowprep) room on TryHackMe. 

  > <b><u>Note:</u></b> If you don't watch the videos listed above from The Cyber Mentor or if you did not go through any of the Buffer Overflow course materials provided from Offensive Security, this is an **absolute** must. Trust me. If you only could do one form of preparation for Buffer Overflows, do this room.

** During the Exam**
- a
- b
- c

### Your Report
#### Report Tips:
x

### Your Results
#### Pass
x

#### Fail
x
