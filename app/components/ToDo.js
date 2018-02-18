
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class pp extends Component<{}> {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //       checked: this.props.val.status,
        
    //     }
    //   }  
    // check() {
    //     const { onChecked, item } = this.props;
    //     onChecked(item, !item.checked);
    //   }
    // check(){
    //     this.setState({
    //       checked: !this.state.checked
    //     })
    //   }

    render() {
        return (
            <View key={this.props.keyval} style={styles.note}>
            <TouchableOpacity style={{ flex: 0.1 }} onPress={this.props.check}>
          <Image source={ this.props.val.status ? require('./check-sign-in-a-rounded-black-square.png') : require('./check-box-empty.png') } />
        </TouchableOpacity>
                <Text style={styles.noteText}>{this.props.val.date}</Text>
                <Text style={styles.noteText}>{this.props.val.note}</Text>

                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>D</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    note: {
        flex: 1,
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'
    },
    noteText: {
        flex: 0.9,
        paddingLeft: 20,
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: 'white'
    }
});
