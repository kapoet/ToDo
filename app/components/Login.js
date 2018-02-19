import React, { Component } from 'react';
import Main from './Main';
import { 
  Container, 
  Header, 
  Item,
  Input,
  Title, 
  Form,
  Content, 
  Footer, 
  FooterTab, 
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  Text } from 'native-base';
  import { Col, Row, Grid } from 'react-native-easy-grid';
  import axios from 'axios'
  import {Alert} from 'react-native';
  
export default class Login extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
        username :'',
        password :'',
    }
}


  CheckDataLogin() {
    const { navigate } = this.props.navigation;
    axios.post('https://ngc-todo.herokuapp.com/api/users/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response)
      if(response.data.message=='User login successful'){
        navigate('Home',{user:response.data.data._id})
        console.log(response.data._id)
      } else{
        Alert.alert("Data Yang anda masukkan salah")
      }
    })
    
  }

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={{flex:1}}>
            <Grid style={{alignItems: 'center'}}>
            <Col>
            <Form>
              <Item>
                <Input placeholder="Username" 
                 onChangeText={(text)=> this.setState({username:text})}/>
              </Item>
              <Item last>
                <Input placeholder="Password" secureTextEntry={true}
                onChangeText={(text)=> this.setState({password:text})}/>
              </Item>
              <Button block style={{marginTop:25}}
                onPress={() => {this.CheckDataLogin()}
                      //  this.props.navigation.navigate('Home')
                      
                      }>
                <Text>Sign In</Text>
              </Button>
              <Body>
                <Button transparent 
                onPress={() => 
                        this.props.navigation.navigate('Register')
                      }>
                  <Text>Register</Text>
                </Button>
              </Body>
            </Form>
         
          </Col>
          </Grid>
        </Content>
      </Container>
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

// const styles = StyleSheet.create({
//   container: {
//   }
// });
