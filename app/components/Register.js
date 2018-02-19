import React, { Component } from 'react';
import Main from './Main';

import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button, Alert, ScrollView, Picker
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import axios from 'axios'

export default class Login extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            gender: 'Male',
            birthdate: '',
            validate: false
        }
    }

    signUp() {
        const { navigate } = this.props.navigation;
        var upperCaseLetters = /[A-Z]/g;
        if (this.state.password.match(upperCaseLetters)) {
            var numbers = /[0-9]/g;
            if (this.state.password.match(numbers)) {
                if (this.state.password.length >= 8) {
                    var lowerCaseLetters = /[a-z]/g;
                    if (this.state.password.match(lowerCaseLetters)) {
                        this.setState({ validate: true })
                    } else {
                        Alert.alert("Password harus mengandung huruf kecil")
                    }
                } else {
                    Alert.alert("Password minimal 8 karakter")
                }
            } else{
                Alert.alert("Password harus mengandung angka")
            }
        } else {
            Alert.alert("Password harus mengandung huruf besar")
        }
        if(this.state.validate==true){
            axios.post('https://ngc-todo.herokuapp.com/api/users/register', {
                username: this.state.username,
                password: this.state.password,
                gender: this.state.gender,
                birthdate: this.state.birthdate
            })
                .then(function (response) {
                    console.log(response)
                    if (response.data.success == true) {
                        navigate('Home',{user:response.data.data._id})
                    } else {
                        this.setState({validate:false})
                        Alert.alert(response.data.message)
                    }
                })
        }
        
    }
    render() {

        return (
            <View style = {styles.container}>
                <TextInput style={{
                        width: 400
                    }}
                    placeholder="Username"
                    onChangeText={(text)=> this.setState({username:text})}
                />
                <TextInput style={{
                        width: 400
                    }}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text)=> this.setState({password:text})}
                />
                <Picker style={{
                        width: 400
                    }}
                    selectedValue={this.state.gender}
                    onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
                <DatePicker
                    style={{
                        width: 400
                    }}
                    date={this.state.birthdate}
                    mode="date"
                    placeholder="Birth Date"
                    format="MM-DD-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { this.setState({ birthdate: date }); }}
                />
                <Button onPress={() => {this.signUp()}} title="Sign Up" > 
                </Button>
            </View>
        )
    }
}
//         <View style={{ flex: 1}}>
//             <Button 
//             title = "Login"
//             onPress={() =>
//                 this.props.navigation.navigate('Home')
//               }  />
//         </View>
//     );
//   }
// }

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputBox: {

        backgroundColor: 'rgba(255, 255,255,1)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }

});
