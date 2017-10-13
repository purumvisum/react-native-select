export default ({
   selectItem : {
       borderRadius: 5,
       padding: 10
   },

    selectItemText : {
        fontSize: 15,
        padding: 10,
    },

    selectInput: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 3000,
        zIndex: 99999,
        padding: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#c0c0c0',
    },

    selectInputText: {
        fontSize: 17,
        color: '#fff'
    },

    optionsWrapper : {
        position: 'absolute',
        flex: 1,
        width: '100%',
        zIndex: 999999,
        alignItems: "stretch",
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    triangle: {
        top: -10,
        right: -10,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff'
    },

    arrowIconWrapper: {
        backgroundColor: 'transparent',
        position:'absolute',
        justifyContent: 'center',
        flexDirection: "row",
        alignSelf: 'center',
        right: 0,
        top: 10,
        flex:1,
    },

    arrowIcon: {
        color: '#295DA5',
        fontSize: 40
    },

    androidModalBg: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center'
    },

    androidModal: {
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        maxHeight: '95%'
    }
});
