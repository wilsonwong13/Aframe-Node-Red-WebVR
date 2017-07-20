# Aframe + Node Red

NYC WebVR Hackathon 2.0 Project

Project Url : https://aframenodered-570e7.firebaseapp.com/

Using Aframe + Node Red, users can perform many actions such as: Interacting with IBM Waston Conversation to generate shapes, Getting Anyone's Tweets, and  Perform Personality Insights on someone Tweets

## Commands
To Generate a Shape
![Alt text]()
- I want a shape || I want to create an object || I want a create a shape || Give me a shape

What Shape do you want to make?

- Ex: A blue box || Blue Box
- Please have the color before the shape
- Current shape that are allow
-- Box, Cylinder, Cone, Torus

Interact with a Shape

- Play Shape || Play with Shape || I want to play with a shape

Which Shape do you want to play?

- Ex: Blue Box

What do you want to do with {Blue box}

- Ex: Position
- Current Action with shape
-- Position

Getting Tweets

- Twitter {Account Name} {Number of Tweets}
- Ex: Twitter BillNye 5

Gettting Twitter Insights

- Insight {Account Name}
- Ex: Insight BillNye

Getting all the properties of generate shapes

- Print

Restarting the webpage

- Restart

## List of API:
- Aframe-keyboard : https://github.com/cjroth/aframe-keyboard
- Making Request : jQuery/Ajax
- Node-Red
- IBM Waston Conversation / IBM Waston Personality Insights
- Twitter


## Node-Red Setup
- Twitter Flow: https://flows.nodered.org/flow/162cd122fcdeb2c0f1c6 and https://github.com/wilsonwong13/node-red-labs/tree/master/node-red-twitter-personality
-- Import twitterInsights to your node-red account
