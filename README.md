# Canvazator
JS Framework for creating stuff in canvas, game-driven.

## Why?
At first i thought *Hey, let's make a js Framework!*
Then i stared at other JS Game Engines and thought *Nah, whatever.*
But one day, the will to create exceeded the frustration of "Being just another one", so i started this thing.

# TODO List
[x] Say that a todo list is needed
[ ] Make a todo list
[ ] Do the todo list

# Getting Started
* Wait for me to finish
* Ask me to put this in NPM and YARN
* `require('canvazator')` or `require('node_modules/canvazator/dist/canvazator.min.js')`
* Also `import {BasicThing, Engine} from canvazator`, i guess
\- or -
* Clone the repository `git clone https://github.com/annibal/canvazator.git`
* Include `dist/canvazator.min.js` (if it already exists) in your index
## Building on a project
Plans are, on an stable beta (yes), to have:
* A full-featured, minified, wrapped min file
* All source classes, with each unique test and example page
* A packer, to allow custom integration with any project, or HMR on the fly
further tutorials will be added when available

# Documentation
Basically, there is this **Engine** thing that starts, loads everything via a **Loader**, then handles a continuous update **Looper** event-driven system.
Also there is this **BasicThing** class (Thing is a class name rarely used) that represents anything and includes itself in the Engine loop
Then there are several Helpers, like **Mathzator**, **Inputzator**, **Meshzator**, **Pointzator**, **Speedzator** etc that serve the purpose of aiding in creating custom objects, derivated from **BasicThing**

# Contributing
**Complain** at the Issues
**Ask for Improvement** at the Issues as well (i guess?)
**Contribute** by cloning and creating a Pull Request. All ideas are welcome!
