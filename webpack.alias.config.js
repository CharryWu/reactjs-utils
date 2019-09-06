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
        'ControlModules': path.resolve(__dirname, 'src_dir/components/ControlPanel/'),
        'ControlContainers': path.resolve(__dirname, 'src_dir/containers/ControlPanel/'),
        'ControlActions': path.resolve(__dirname, 'src_dir/actions/ControlPanel/'),
        'ControlReducers': path.resolve(__dirname, 'src_dir/reducers/ControlPanel/'),
        'ControlConstants': path.resolve(__dirname, 'src_dir/constants/ControlPanel/'),
        'ControlEpics': path.resolve(__dirname, 'src_dir/epics/ControlPanel/'),

        'LoginModules': path.resolve(__dirname, 'src_dir/components/Login/'),
        'LoginContainers': path.resolve(__dirname, 'src_dir/containers/Login/'),
        'LoginActions': path.resolve(__dirname, 'src_dir/actions/Login/'),
        'LoginReducers': path.resolve(__dirname, 'src_dir/reducers/Login/'),
        'LoginConstants': path.resolve(__dirname, 'src_dir/constants/Login/'),
        'LoginEpics': path.resolve(__dirname, 'src_dir/epics/Login/'),

        'SignupModules': path.resolve(__dirname, 'src_dir/components/Signup/'),
        'SignupContainers': path.resolve(__dirname, 'src_dir/containers/Signup/'),
        'SignupActions': path.resolve(__dirname, 'src_dir/actions/Signup/'),
        'SignupReducers': path.resolve(__dirname, 'src_dir/reducers/Signup/'),
        'SignupConstants': path.resolve(__dirname, 'src_dir/constants/Signup/'),
        'SignupEpics': path.resolve(__dirname, 'src_dir/epics/Signup/'),

        'ChangelogsModules': path.resolve(__dirname, 'src_dir/components/Changelogs/'),

        'AnalyticsModules': path.resolve(__dirname, 'src_dir/components/Analytics/'),

        'LocalStorageActions': path.resolve(__dirname, 'src_dir/actions/LocalStorage/'),
        'LocalStorageReducers': path.resolve(__dirname, 'src_dir/reducers/LocalStorage/'),

        'Src': path.resolve(__dirname, 'src_dir/'),
        'Hooks': path.resolve(__dirname, 'src_dir/hooks/'),
        'Modules': path.resolve(__dirname, 'src_dir/components/'),
        'Containers': path.resolve(__dirname, 'src_dir/containers/'),
        'Actions': path.resolve(__dirname, 'src_dir/actions/'),
        'Reducers': path.resolve(__dirname, 'src_dir/reducers/'),
        'Constants': path.resolve(__dirname, 'src_dir/constants/'),
        'Epics': path.resolve(__dirname, 'src_dir/epics/'),
        'Utils': path.resolve(__dirname, 'src_dir/utils/'),
        'ReduxSelectors': path.resolve(__dirname, 'src_dir/reduxSelectors/'),
        'LocalStorageAPI': path.resolve(__dirname, 'src_dir/utils/LocalStorageAPI/'),
        'Extra': path.resolve(__dirname, 'src_dir/extra/'),

        'MockData': path.resolve(__dirname, '__mocks__/'),
        'Tests': path.resolve(__dirname, '__tests__/'),
        'DjangoRestAPI': path.resolve(__dirname, 'src_dir/utils/DjangoRestAPI.js')
    }
}
