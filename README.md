# FireWeather

Demo app used to demonstrate Firebase Cloud Messaging at LaunchPadSSA 2016.

The app was made to quickly demonstrate how web notifications work at <a href="https://twitter.com/search?src=typd&q=%23launchpaddev">#launchpaddev</a>

Keeping it lit with FireWeather :)

## Download and use

### Step 1: Clone the repo

Run a git clone to pull the repo's content

```
git clone git@github.com:Johanndutoit/FireWeather.git
```

### Step 2: Set Project ID

Set the project id of your Project in `.firebaserc`:

```
{
  "projects": {
    "default": "<project-uid-here>"
  }
}
```

### Step 3: Configure api keys

Configure with your authentication details to Firebase

In `public/app.js` on line #3, change the placeholders with your app's own config that will be presented when you attempt to create a new Web app from the Firebase console:

```
var config = {
  
  apiKey: "<api-key>",
  authDomain: "<auth-domain>",
  databaseURL: "<database-url>"
  
};
```

### Step 4: Run the service

To run the server locally, run the following command:

```
firebase serve
```

### Step 5: Deploy the service

To deploy run the following command:

```
firebase deploy
```

## MIT License

Copyright (c) 2016 Johann du Toit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
