### Origin
This project was made for 'image processing' classes during my studies.


### Project topic
*Create an application that will count objects visible on a picture.*

### My approach
* The idea was to get the best grade if it is posible, learn something new, not use matlab and keep my React skill level up (after 2 mounths break)
* Write image processing core using python instead of matlab,
* Give user full control over used image processing methods so  images of different types can be precessed,
* Manual tests only - no time for writing unit tests.
#### Backend:
* Serve application from server,
* No need for truly RESTful backend app,
* One image processing at the time,
* Project demo will be shown one on local computer, so there is no need of running backend app on remote server.
#### Frontend:
* Create frontend app in React and gain some exp in it,
* Write application without using Redux - use only state,
* Create UI using ready-made components - MaterialUI in this case,
* UI should work just only to be showed once on large screen - no need to adjust it for different resolutions or care about resize events etc.

### Second thoughts:
##### ...read especially if You are recruiter
* I had only a bit less than 2 weeks, so it had to be done fast.
* Not using Redux was mistake, I should have been use at least useReducer hook, but back then it was faster not to learn Redux, then using state only.
* Server should be truly RESTful. Foreach newly uploaded image it should be stored in some DB-like storage, new image-processor should be create only to process image of specific ID when new instructions are arriving. Maybe some caching mechanism for not to kill instantly instance of image-processor, so there is no need for frequent I/O operations. 
* Both apps would really benefits form been writen with TDD approach, cause there is a lot of bugs, that can been avoided
* Fixing some CSS could also make things better.

If I had more time back then, I would have already done the above.

*This project was created almost a year ago but, as far as I remember, it did worked as intended and I got my 5/A grade.*