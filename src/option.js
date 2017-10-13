'use strict';

const React = require('react');

import {
    Text,
    TouchableOpacity
} from 'react-native';

import styles from './styles';

export default class Option extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style = {styles.selectItem}
                onPress = { this.props.onPress }>
                <Text style = {styles.selectItemText}>
                    {this.props.value}
                </Text>
            </TouchableOpacity>
        );
    }
}

