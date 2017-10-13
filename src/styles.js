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
        zIndex: 9,
        padding: 30,
        backgroundColor: '#E5E5E5'
    },

    selectInputText: {
        fontSize: 17,
        color: '#000'
    },

    optionsWrapper : {
        position: 'absolute',
        flex: 1,
        width: '90%',
        marginLeft: '5%',
        zIndex: 999999,
        justifyContent: 'center',
        alignItems: "stretch",
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .8,
        shadowRadius: 7,

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
        zIndex: 10
    },

    arrowIcon: {
        color: '#7E7E7E',
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
        maxHeight: '70%'
    }
});
