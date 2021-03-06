import {
    View,
    Text,
    TouchableWithoutFeedback,
    FlatList,
    Animated,
    Modal,
    Platform,
    Keyboard
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const React = require('react');
const merge = require('deepmerge');

import stylesDefault from './styles';
import Option from './option';

export default class Select extends React.PureComponent {

    constructor(props) {
        super(props);

        if (!this.props.data) {
            throw new SyntaxError('Please specify data attribute. It is required.');
        }

        this.state = {
            animatedOpacity: new Animated.Value(0),
            animatedTopPos: new Animated.Value(0),
            spinValue: new Animated.Value(0),
            openSelect: false,
            height: 0,
            selectedValue: this.props.data.length > 1 && this.props.placeholder ? null : this.props.data[0],
            topOffset: this.props.topOffset ? this.props.topOffset : 80,
            placeholder: this.props.placeholder
        };

        this._toggleOptions = this._toggleOptions.bind(this);
        this._renderItemComponent = this._renderItemComponent.bind(this);
        this._onSelectInputPress = this._onSelectInputPress.bind(this);

        this.styles = merge.all([ stylesDefault, this.props.styles ]);

    }

    componentDidMount() {
        if (this.state.selectedValue) {
            this.props.onSelect ? this.props.onSelect(this.state.selectedValue) : () => true;
        }
    }

    _toggleOptions() {
        this.setState({
            openSelect: !this.state.openSelect
        }, () => {
            if (this.state.openSelect) {
                this.setState({
                    height: this.props.selectOptionsHeight ? this.props.selectOptionsHeight : 300
                });
            }

            Animated.parallel([
                Animated.timing(
                    this.state.animatedOpacity, {
                        toValue: this.state.openSelect ? 1 : 0,
                        duration: 500
                    }),
                Animated.timing(
                    this.state.animatedTopPos, {
                        toValue: this.state.openSelect ? this.state.topOffset : this.state.topOffset - 20,
                        duration: 500
                    }),
                Animated.timing(
                    this.state.spinValue,
                    {
                        toValue: this.state.openSelect ? 1 : 0,
                        duration: 500
                    })
            ]).start(() => {
                // if it is try to close now
                if (!this.state.openSelect) {
                    this.setState({
                        height: 0
                    });
                }
            });
        });

    }

    _selectedItem(item) {
        this.setState({
            selectedValue: item
        });

        // Custom select action
        this.props.onSelect ? this.props.onSelect(item) : () => true;

        this._toggleOptions();
    }

    _renderItemComponent(item) {
        return (
            <Option
                onPress = { () => this._selectedItem(item.item) }
                value = { item.item } />
        );
    }

    _onSelectInputPress() {
        Keyboard.dismiss();
        this._toggleOptions();
    }

    render() {
        const spin = this.state.spinValue.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ '0deg', '180deg' ]
        });


        return (
            <View
                style = { this.styles.selectMainWrapper }>
                <TouchableWithoutFeedback
                    onPress = { this._onSelectInputPress }>
                    <View
                        style = { [ this.styles.selectInput ] }>
                        { this.state.selectedValue
                            && <Text style = { this.styles.selectInputText }>
                                {this.state.selectedValue}
                            </Text>}
                        {!this.state.selectedValue
                            && <Text style = { this.styles.selectInputPlaceholderText }>
                                {this.state.placeholder}
                            </Text>}
                    </View>
                </TouchableWithoutFeedback>

                { Platform.OS !== 'ios'
                && <Modal
                    presentationStyle = 'overFullScreen'
                    animationType = "slide"
                    transparent = { true }
                    visible = { this.state.openSelect }
                    supportedOrientations = { [ 'portrait', 'landscape-right', 'landscape-left' ] }
                    onRequestClose = { () => true } >
                    <View style = { [ this.styles.androidModalBg ] }>
                        <View style = { [ this.styles.androidModal ] }>
                            <FlatList
                                data = { this.props.data }
                                renderItem = { this._renderItemComponent }
                                keyExtractor = {  item => { return item } } />
                        </View>
                    </View>
                </Modal>
                }
                { Platform.OS === 'ios'
                && <Animated.View
                    style = { [
                        {
                            opacity: this.state.animatedOpacity,
                            top: this.state.animatedTopPos,
                            height: this.state.height
                        },
                        this.styles.optionsWrapper
                    ] }>

                    <View style = { this.styles.triangle } />

                    <FlatList
                        data = { this.props.data }
                        renderItem = { this._renderItemComponent }
                        keyExtractor = {  item => { return item } } />
                </Animated.View>
                }

                <Animated.View
                    style = { [ {
                        transform: [ { rotate: spin } ]
                    }, this.styles.arrowIconWrapper ] }>
                    <Icon
                        style = { [
                            this.styles.arrowIcon
                        ] }
                        name = { 'keyboard-arrow-down' } />
                </Animated.View>

            </View>

        );
    }
}
