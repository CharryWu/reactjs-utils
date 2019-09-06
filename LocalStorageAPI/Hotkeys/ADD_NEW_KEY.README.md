## To register a new global keystroke:
### To a new component to listen to keypress
1. Add new hotkey combinations to `HotkeysListener.js`. In the section define keystroke
constants and add that constant to key arr, and add that keystroke to `onKeyUp()`
to the corresponding hotkeylistener in the same manner as `LectureViewerHotkeysListener`
2. Add keypressed states to `HotkeysContext.js`
3. Add state mutator functions for the new keystroke to `HotkeysStateSetters.js` file
4. Wrap the component you want to respond to hotkeys with `Hotkeys.Consumer`
    see `LectureModules/NotesContainer` in `LectureModules/MainInterface.js`
5. Pass `hotkeyState` and `resetHotkeys()` to the receiver component as props
6. Call `resetHotkeys()` after finishing the intended operation
    see `Notes.componentDidUpdate()`