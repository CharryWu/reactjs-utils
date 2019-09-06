import * as TranscriptFontSizeAPI from './TranscriptFontSizeAPI'
import * as TranscriptRecentSearchesAPI from './TranscriptRecentSearchesAPI'
import * as NotesZoomAPI from './NotesZoomAPI'
import * as NotesCurrentBlobAPI from './NotesCurrentBlobAPI'
import * as LocalStorageBaseApi from './LocalStorageBaseAPI'
import * as PlayTimeApi from './PlayTimeAPI'
import * as LayoutModeApi from './LayoutModeAPI'
import * as VideoModeApi from './VideoModeAPI'

export default {...TranscriptFontSizeAPI,...TranscriptRecentSearchesAPI,
    ...NotesZoomAPI,...LocalStorageBaseApi,...PlayTimeApi, ...NotesCurrentBlobAPI,
    ...LayoutModeApi,...VideoModeApi
}
