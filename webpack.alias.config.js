/**
 * Decentralized configuration for webpack aliases. It is designed to be
 * a getter function instead of a plain JS object to allow easy file relocation.
 * @param path path module required from `webpack.config.js`
 * @param {string} __dirname from `webpack.config.js`
 * @return {object} config object for alias mapping
 * @author Zichao (Charry) Wu
 */
exports.default = function(path, __dirname) {
    return {
        'LectureModules': path.resolve(__dirname, 'src/components/LectureViewer/'),
        'LectureContainers': path.resolve(__dirname, 'src/containers/LectureViewer/'),
        'LectureActions': path.resolve(__dirname, 'src/actions/LectureViewer/'),
        'LectureReducers': path.resolve(__dirname, 'src/reducers/LectureViewer/'),
        'LectureConstants': path.resolve(__dirname, 'src/constants/LectureViewer/'),
        'LectureEpics': path.resolve(__dirname, 'src/epics/LectureViewer/'),

        'ControlModules': path.resolve(__dirname, 'src/components/ControlPanel/'),
        'ControlContainers': path.resolve(__dirname, 'src/containers/ControlPanel/'),
        'ControlActions': path.resolve(__dirname, 'src/actions/ControlPanel/'),
        'ControlReducers': path.resolve(__dirname, 'src/reducers/ControlPanel/'),
        'ControlConstants': path.resolve(__dirname, 'src/constants/ControlPanel/'),
        'ControlEpics': path.resolve(__dirname, 'src/epics/ControlPanel/'),

        'CourseModules': path.resolve(__dirname, 'src/components/CourseBrowser/'),
        'CourseContainers': path.resolve(__dirname, 'src/containers/CourseBrowser/'),
        'CourseActions': path.resolve(__dirname, 'src/actions/CourseBrowser/'),
        'CourseReducers': path.resolve(__dirname, 'src/reducers/CourseBrowser/'),
        'CourseConstants': path.resolve(__dirname, 'src/constants/CourseBrowser/'),
        'CourseEpics': path.resolve(__dirname, 'src/epics/CourseBrowser/'),

        'LoginModules': path.resolve(__dirname, 'src/components/Login/'),
        'LoginContainers': path.resolve(__dirname, 'src/containers/Login/'),
        'LoginActions': path.resolve(__dirname, 'src/actions/Login/'),
        'LoginReducers': path.resolve(__dirname, 'src/reducers/Login/'),
        'LoginConstants': path.resolve(__dirname, 'src/constants/Login/'),
        'LoginEpics': path.resolve(__dirname, 'src/epics/Login/'),

        'SignupModules': path.resolve(__dirname, 'src/components/Signup/'),
        'SignupContainers': path.resolve(__dirname, 'src/containers/Signup/'),
        'SignupActions': path.resolve(__dirname, 'src/actions/Signup/'),
        'SignupReducers': path.resolve(__dirname, 'src/reducers/Signup/'),
        'SignupConstants': path.resolve(__dirname, 'src/constants/Signup/'),
        'SignupEpics': path.resolve(__dirname, 'src/epics/Signup/'),

        'ChangelogsModules': path.resolve(__dirname, 'src/components/Changelogs/'),

        'AnalyticsModules': path.resolve(__dirname, 'src/components/Analytics/'),

        'LocalStorageActions': path.resolve(__dirname, 'src/actions/LocalStorage/'),
        'LocalStorageReducers': path.resolve(__dirname, 'src/reducers/LocalStorage/'),

        'Src': path.resolve(__dirname, 'src/'),
        'Hooks': path.resolve(__dirname, 'src/hooks/'),
        'Modules': path.resolve(__dirname, 'src/components/'),
        'Containers': path.resolve(__dirname, 'src/containers/'),
        'Actions': path.resolve(__dirname, 'src/actions/'),
        'Reducers': path.resolve(__dirname, 'src/reducers/'),
        'Constants': path.resolve(__dirname, 'src/constants/'),
        'Epics': path.resolve(__dirname, 'src/epics/'),
        'Utils': path.resolve(__dirname, 'src/utils/'),
        'ReduxSelectors': path.resolve(__dirname, 'src/reduxSelectors/'),
        'LocalStorageAPI': path.resolve(__dirname, 'src/utils/LocalStorageAPI/'),
        'Extra': path.resolve(__dirname, 'src/extra/'),

        'MockData': path.resolve(__dirname, '__mocks__/'),
        'Tests': path.resolve(__dirname, '__tests__/'),
        'DjangoRestAPI': path.resolve(__dirname, 'src/utils/DjangoRestAPI.js')
    }
}
