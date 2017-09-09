## What's the user doing (.js :+1:)

**tl;dr**

[KrauseFx](https://github.com/KrauseFx/whats-the-user-doing) recently noticed a gap of how websites can determine the activity of the user based on the acceleration and gyro sensor built into modern smartphones, including the iPhone and Google Pixel.

Using that data, web apps can determine if the user is using their phone while

- sitting
- standing
- walking
- running
- driving
- taking a picture
- lying in bed
- laying the phone on a table

and probably more, including guesses if the user is actively using their phone at this moment, or even if they're impaired by alcohol.

**This project**

This was an inspiration for a JavaScript library. I saw the demo of KrauseFx then I want to build a package for these.

[Open the web-app on your mobile device](https://krausefx.github.io/whats-the-user-doing/)

![./assets/photo.jpg](./assets/photo.jpg)

**Usage**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Awesome App</title>
    <script src="https://cdn.rawgit.com/cagataycali/whats-the-user-doing.js/master/whats-the-user-doing.js"></script>
    <!-- ... -->
  </head>
  <!-- ... -->

  <script>
    window.addEventListener("doing", e => alert(JSON.stringify(e.detail)) );
  </script>
</html>
```

**Details**

*Package generate a custom event listener with **message** and **code***.


| Message                                                	| Code 	|
|--------------------------------------------------------	|--------	|
| "driving or other form of transportation"              	| 0      	|
| "lying in bed sideways, or taking a landscape picture" 	| 1      	|
| "lying on your back, with your phone up"               	| 2      	|
| "using your phone while walking"                       	| 3      	|
| "using your phone, sitting or standing"                	| 4      	|
| "taking a picture"                                     	| 5      	|
| "taking a selfie"                                      	| 6      	|
| "using the phone on a table"                           	| 7      	|


**Users should know what's your purpose of collecting these data.**

*Cagatay*
