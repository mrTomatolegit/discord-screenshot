# Discord Screenshot Generator

This package will help you create realistic images that simulate messages from Discord

(Not published to NPM)

# Installation
NPM:\
`npm install discord-screenshot`\
Yarn:\
`yarn add discord-screenshot`

# How to use
```js
new DiscordScreenshot()
    .setPfp('./pfp.png')
    .then(x => x.setUsername('MrTomato'))
    .then(x => x.setTimestamp(new Date()))
    .then(x => x.setContent('Hello world!'))
    .then(x => x.construct())
    .then(x => x.write('./output.png'));
```

# How was this made

Check [the MEASUREMENTS file](./MEASUREMENTS.md) for the measurements used to create the image accurately
