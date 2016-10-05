Recreate a simple version of [React](https://github.com/facebook/react).

###Get started
To install packages and build:
```
$ npm install
$ npm run start
```
Then open `index.html` in your browser.

To run tests:
```
$ npm run test
```

###Goals
- understand better how React works
- use pure JS
- interact with browser APIs
- use ES6
- set up a project


###Resources:
- [React](https://github.com/facebook/react)
- [Preact](https://github.com/developit/preact)
- [ES6 for Universal JS Apps](https://medium.com/javascript-scene/how-to-use-es6-for-isomorphic-javascript-apps-2a9c3abe5ea2#.xfoth6mdp)
- [Virtual DOM](https://github.com/Matt-Esch/virtual-dom)


###General Todos
- add eslint
- use https://github.com/paul-jean/dom-viz to see if correct divs are changing


###Virtual DOM Todos/Steps
1. create virtual DOM, eg what original DOM should look like
2. append virtual DOM to actual DOM
3. listen for updates from components
4. create new virtual DOM with changes
5. diff the virtual DOM with actual DOM (-> patches)
6. patch original DOM with patches
7. start again from step 3
