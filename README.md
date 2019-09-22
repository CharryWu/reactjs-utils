# reactjs-utils
Useful util JS files from past internship

## Helper functions to diff and wiring props for React components + debounce, throttle, memoize in VanillaJS
[Utils.js](https://github.com/CharryWu/reactjs-utils/blob/master/Utils.js)

## Make a div draggable
[View draggable thumb in action (video)](https://drive.google.com/file/d/18rUHgO7V1O3rJL4OHtJ2hRzBUs0a-BHz/view)  
[draggable.js](https://github.com/CharryWu/reactjs-utils/blob/master/draggable.js)  
[PanVideoMiniMap.scss](https://github.com/CharryWu/reactjs-utils/blob/master/PanVideoMiniMap.scss)

## Manipulate class names using VanillaJS (not using react)
[ClassNameUtils.js](https://github.com/CharryWu/reactjs-utils/blob/master/ClassNameUtils.js)

## Example of manipulating browser LocalStorage APIs
See files under [LocalStorageAPI/](https://github.com/CharryWu/reactjs-utils/tree/master/LocalStorageAPI)

## Webpack config file decentralization
[webpack.config.js](https://github.com/CharryWu/reactjs-utils/blob/master/webpack.alias.config.js) main config file, imports other config files to avoid getting large  
[webpack.alias.config.js](https://github.com/CharryWu/reactjs-utils/blob/master/webpack.alias.config.js) supports path custom aliases, reduces import path length (e.g. `import "ReducerActionsDir/SomeAction"` instead of `import "../../actions/SomeAction"`)  
[webpack.module.rules.config.js](https://github.com/CharryWu/reactjs-utils/blob/master/webpack.module.rules.config.js)  
[webpack.plugins.config.js](https://github.com/CharryWu/reactjs-utils/blob/master/webpack.plugins.config.js)


## fuse.js fuzzy search integration
[View fuzzy search in action (video)](https://drive.google.com/open?id=1IpQmeMtvKihWYBaFo1iUP0x-cs7tj6Cj)  
[TranscriptSearch.js](https://github.com/CharryWu/reactjs-utils/blob/master/TranscriptSearch.js)

## Video.js plugins
### Seekable playback time
[SeekTextInput.plugin.js](https://github.com/CharryWu/reactjs-utils/blob/master/SeekTextInput.plugin.js)  
![seekable playback](https://github.com/CharryWu/reactjs-utils/blob/master/timeseekinput.png)
### Time tooltip (on mouse hover)
[ShowTooltipByTime.plugin.js](https://github.com/CharryWu/reactjs-utils/blob/master/ShowTooltipByTime.plugin.js)  
![time tooltip](https://github.com/CharryWu/reactjs-utils/blob/master/hovertooltip.png)

