//Modules
//Real world applications are split into multiple files called modules
//it allows for maintanability, reusability and abstraction
//There are no modules in ES5. Developers cam up with module  (syntax to define modules)
//Module formats: AMD (asynchronous module definition used in browsers), CommonJS (used in node), UMD (universal module definition used in browser and node)
//ES6 natively supports modules
// Focus on ES6 modules (browsers) and CommonJS (node)

//CommonJS modules
//Rule about modularity: highly related things go together (Cohesion)
//By default everything in a module is Private (unaccessible) unless explicitly exported
//Export syntax for CommonJS: module.exports.Circle = Cirlce ("module" refers to the current module and "exports" is an object in which we add the item we want to export as a property)
//Or: module.exports = Circle (instead of adding a circle propety, reset the module object to the circle class)
//Import syntax for CommonJS: const Circle = require('/circle.js') (pass a relative url)
//COmmonJS format defines: require() & module.exports
//The exported content (class) is the "Public Interface", non-exported content (WeakMap) is "Implementation Detail"; that is Abstraction

//ES6 modules
// Export syntax for ES6 modules: export class Circle{}
// Add type="module" in script tags (so the browser treats index.js as a module and prevent syntax error in development due to import braces {})
// Import syntax for ES6 modules: import {Circle} from "./circle.js" (add ".js" to prevent GET error in development. can be fixed with webpack)

//ES6 tooling
//These tools are important for building browser applications not server applications (node)
//When using modern JS you need two types of tools: Transpiler and Bundler
//Transpiler (Translator + compiler): converts modern JS code into code all browsers can understand (eg Babel)
//Module Bundler: combines JS files into a single file called Bundles (eg Webpack)
//Webpack combines all JS files into a single file (Bundle), minifies (removes whitespaces and comments) and uglifies (shorten identifier names) the code reducing the bundle size served to the client

//Babel
//You need node to install the tools above. Specifically a tool that comes with node NPM
//NPM is a tool used to install 3rd party libraries and tools
//Step 1: install node run "node -v" to verify
//Step 2: Create folder "babel-demo"
//Step 3: initialize a node project in the folder run "npm init --yes" (creates a file called package.json which is an identification for the application)
//Step 4: install babel run "npm i babel-cli@6.26.0 babel-core@6.26.0 babel-preset-env@1.6.1 --save-dev"
//"babel-cli" is the babel command line interface tool (like npm) and we give it the name of the js file which it compiles
//"babel-core" is where the logic of transpiling code is implemented
//"babel-preset" in babel there is a plugin for every new JS feature from ES6 (eg let, const, arrow functions). You can install your needed plugins. 'babel-preset' combines and understands all the plugins for flexibility
//Step 5: add a new file in "es6-tooling", "index.js" and write basic ES6 code
//Step 6: use Babel to convert it to code all browsers can understand
//Step 7: go to package.json, and add a new script in the script section; "babel": "babel --presets env index.js -o build/index.js" and create a "build" folder
//"babel" is the label for the script, babel is the cli, --presets is the preset env, index.js is the source file, -o is the output stored in the folder build/index.js
//scripts defined under the script section can be run with npm; "npm run babel"
//Step 8: run "npm run babel"
//babel compiles one file at a time, webpack allows to compile all JS files before bundling

//Webpack
//Babel steps above was just for demonstration and is not used in production
//Step 1: Create a project with two modules "index.js" and "circle.js"
//Step 2: install webpack & webpack cli locally in your project; run "npm install --save-dev webpack webpack-cli"
//Step 3: add a script to your package.json to simplify running webpack; "scripts": { "build": "webpack"}
//Step 4: Then, run webpack with: "npm run build" or "npx webpack" to bundle your application
//Step 5: the bundled (minified and uglified ES5) applicaion is stored in "dist"
//Step 6: Go to index.html and change the src to "dist/main.js"
//Step 7: Because were using a bundle you can remove type="module" from script tags and .js from imports (eg import { Circle } from "./circle.js";)
//Step 8: to prevent always running "npm run build" after making changes to the source files, in package.json set "scripts": { "build": "webpack -w"}
//NB: -w is short for watch, makes webpack to automatically regenerate the bundle after changes are made to the source files
//Step 9: run "npm run build"
