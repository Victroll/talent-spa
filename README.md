# Talent Tree Creator
Have you ever wanted to create your own talent tree? Maybe for your own game, a RPG like D&D or just for fun? With this tool you can do that!
## Motivation
The idea behind this tool is no other than have fun programming and let the world know about it. Of course, it's cool to have some kind of tool that allows you to recreate some talent tree as seen in some RPG games. The current state of this project is very basic, but powerful enough to achieve the initial purpose.
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
In order to be able of playing with this, you need to have installed `npm` 5.6.0 at least, and that's all!
### Installing
Once you have downloaded the project, just run `npm install` to install all de dependencies of the project. Be sure of having, at least, 180 MB of free disk space.
### Running
In order to run this project and test it, you only have to run the command `npm start`. Once everything is compiled and loaded, you will be able of play it in te URL `localhost:3000` by default.
## How it works
This application only has a functional place: "Create". Here, you can create a very simple talent tree and interact with it. The top bar has 6 buttons:
* Configuration - Here you can configurate in which case a talent that is blocked by others, should be activated: when the others talents have, at least, 1 point or when all have all their points.
* Save - You can save a talent tree with a name.
* Load - You can load a talent tree that has been previously saved.
* Add talent (+) - Add a new talent to the 'blackboard'. This talent always will appear in the top left corner with an random icon.
* Remove talent (-) - Remove a talent from the 'blackboard' when selecting it. When removing a talent, all the others will update their data.
* Play/Edit - Change the operation mode. In edit mode you can use the other buttons and modify anything of the talent tree but you can not test the functionality. In the play mode you only be able of increase (left mouse button) or decrease (right mouse button) the points of the talents.

In order of having the save and load functionality, you must launch the project [talent-node](https://github.com/Victroll/talent-node). This project works as the backend of this application.
## Tests
Although basic testing is included in the project, there is a lot of work to do about this. The framework used to do the testing is [Cypress](https://www.cypress.io/).