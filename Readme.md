# Homework #1

This is the first homework for the "Nodejs masterclass" course

## Requirements

Node v8.x.x

## Usage
Since this can be run for 2 environments (staging and production), here are the necessary commands for Windows (Powershell).
For staging, and production:

```javascript
 $env:NODE_ENV = "staging"; node index.js
```

```javascript
 $env:NODE_ENV = "production"; node index.js
```
On Linux, these should work without any issues:


```javascript
NODE_ENV = "staging" node index.js
```

```javascript
NODE_ENV = "production" node index.js