# Renothingness #

A remake of [Nothingness](https://github.com/mocsarcade/nothingness), a dungeon-crawling top-down action-adventure game inspired by the Legend of Zelda from the NES. Now developed in Javascript instead of Java.

It features five procedurally generated dungeons with randomly distributed treasure and enemies. Fight monsters, manage your resources, and escape from the nothingness!

The game was originally developed by a team of six students in just eight weeks. After it was finished, it was be deployed on the Mocs Arcade Cabinet, and submitted to the Indie Game Festival Student Competition.

Learn more about the project at our [Trello](https://trello.com/b/rzCWqT18/project-imprisoned) or [Tumblr](http://mocsarcade.tumblr.com).

## Installation ##

### To install our tools ###

	$ choco install git
	$ choco install node
	$ npm install -g gulp
	$ npm install -g jasmine-node

### To install all our dependencies ###

	$ npm install
	$ bower install

## Development ##

Before you start, be sure to look through the [contribution guidelines](CONTRIBUTING.md)!

### To compile the code ###

We've configured a [gulpfile](gulpfile.js) that will compile our project; it will read from the ``source`` directory, and write to a ``build`` directory. After everything has been compiled, it can be played from a browser.

	$ gulp

This process is affording us a lot; it concatenates all our scripts through browserify, and it translates all our styles through sass.

### To recompile while you code ###

We're all about iterative development, so we've set up a method for recompiling the project whenever anything is changed. It will report any errors, but won't terminate the process.

	$ gulp watch

### To run a server for the code ###

We also set up a server to host the game as you develop it. It statically builds and serves the code. You can access the server
at [localhost:3000](http://localhost:3000).

	$ gulp server

The server will rebuild the project whenever you change something, and if you have [livereload](http://livereload.com) installed in your browser, will automatically refresh.
