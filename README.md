Recreate a simple version of [React](https://github.com/facebook/react).

### Get started
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

### Goals
- understand better how React works
- use pure JS
- interact with browser APIs
- use ES6
- set up a project
- practice TDD


### Resources:
- [React](https://github.com/facebook/react)
  - https://facebook.github.io/react/contributing/implementation-notes.html
  - https://facebook.github.io/react/docs/reconciliation.html
- [ES6 for Universal JS Apps](https://medium.com/javascript-scene/how-to-use-es6-for-isomorphic-javascript-apps-2a9c3abe5ea2#.xfoth6mdp)


### General Todos
- add eslint
- use https://github.com/paul-jean/dom-viz to see if correct divs are changing
- handle img tags (no children will break!), p tags with a tags inside


### Virtual DOM Steps
1. create virtual DOM, eg what original DOM should look like
2. append virtual DOM to actual DOM
3. listen for updates from components
4. create new virtual DOM with changes
5. diff the virtual DOM with actual DOM (-> patches)
6. patch original DOM with patches
7. start again from step 3


### Approaches taken
- render
  - just render into doc
  - hold all logic around diffing and patching, plus reference to the latest tree
- general
  - use classes (eg VirtualPatch)
- createElement
  - returns string
  - returns dom node
- diff
  - store reference to target note
  - store path to target note
  - return an object of patches with keys as indices, values as patches
  - create elements while diffing
  - return an array of patches
- patch
  - apply patch while traversing vdom
  - apply patch while traversing real dom
- nodes
  - elm-like div representation, no ids (eg `['p', { id: 'blue' }, [ 'hello world' ]]`)
  - use simple objects, with ids (eg factories)
  - createNode returns obj
  - createNode returns dom node
  - keep track of ids, every vnode gets an id
  - only give ids to vnodes that need them
  - give no nodes ids; instead, give them reference to their dom el

### other-examples/
Examples of a virtual DOM from other places. To compile, run `webpack` from the directory.
- [virtual-dom-medium/](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060#.fess65wex)
- [virtual-dom-npm/](https://github.com/Matt-Esch/virtual-dom)
- [preact/](https://github.com/developit/preact)
