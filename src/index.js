'use strict';

// import React, { Component } from 'react';
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

import styles from './styles';
import Option from './option';

export default class Select  extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            animatedOpacity: new Animated.Value(0),
            animatedTopPos: new Animated.Value(0),
            spinValue: new Animated.Value(0),
            openSelect: false,
            selectedValue: this.props.data[0],
        };

        this._toggleOptions = this._toggleOptions.bind(this);
        this._renderItemComponent = this._renderItemComponent.bind(this);
        this._onSelectInputPress = this._onSelectInputPress.bind(this);
    }

    _toggleOptions() {
        if (this.state.openSelect) {
            this.setState({
                height: this.props.selectOptionsHeight
            })
        }
        this.setState({
            openSelect: !this.state.openSelect
        })
        Animated.parallel([
            Animated.timing(
                this.state.animatedOpacity, {
                    toValue: this.state.openSelect ? 1 : 0,
                    duration: 500
                }),
            Animated.timing(
                this.state.animatedTopPos, {
                    toValue: this.state.openSelect ? 80 : 60,
                    duration: 500
                }),
            Animated.timing(
                this.state.spinValue,
                {
                    toValue: this.state.openSelect ? 1 : 0,
                    duration: 500
                })
        ]).start( () => {
            // if it is try to close now
            if (this.state.openSelect) {
                this.setState({
                    height: 0
                })
            }
        });

    }

    _selectedItem(item) {
        this.setState({
            selectedValue: item
        });

        // Custom select action
        this.props.onSelect(item)

        this._toggleOptions();
    }

    _renderItemComponent (item) {
        return (
            <Option

                onPress = { () => this._selectedItem(item.item)  }
                value = { item.item }
            />
        )
    }

    _onSelectInputPress() {
        Keyboard.dismiss()
        this._toggleOptions()
    }

    render() {
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        })


        return (
        <View
            style = {{
                zIndex: 999999,
            }}

        >

            <TouchableWithoutFeedback
                onPress = { this._onSelectInputPress }>
                <View
                    style = { [styles.selectInput, this.props.styles.selectInput] }
                >
                    <Text style = { [styles.selectInputText, this.props.styles.selectInputText]}>
                        {this.state.selectedValue}
                    </Text>
                </View>


            </TouchableWithoutFeedback>

            { Platform.OS !== 'ios' &&
            <Modal
                presentationStyle = 'overFullScreen'
                animationType="slide"
                transparent={true}
                visible={this.state.openSelect}
                supportedOrientations={['portrait', 'landscape-right', 'landscape-left']}
            >
                <View style = {[styles.androidModalBg]}>
                    <View style = {[styles.androidModal]}>
                        <FlatList
                            data={this.props.data}
                            renderItem={this._renderItemComponent}
                            keyExtractor={item => item.index}
                        />
                    </View>
                </View>
            </Modal>
            }


            <Animated.View
                style = {[
                    {
                        opacity: this.state.animatedOpacity,
                        top: this.state.animatedTopPos,
                        height: this.state.height
                    },
                    styles.optionsWrapper,
                    this.props.styles.optionsWrapper
                ]}>

                <View style={styles.triangle} />

                <FlatList
                    data={this.props.data}
                    renderItem={this._renderItemComponent}
                    keyExtractor={item => item.index}
                />
            </Animated.View>

            <Animated.View
                style = {[{
                    transform: [{rotate: spin}]
                }, styles.arrowIconWrapper, this.props.styles.arrowIconWrapper ]}>
            <Icon
                style={[
                    styles.arrowIcon, this.props.styles.arrowIcon
                ]}
                name={'keyboard-arrow-down'}/>
        </Animated.View>



        </View>

        );
    }
}

