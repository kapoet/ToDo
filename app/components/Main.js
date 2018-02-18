
import React, { Component } from 'react';
import ToDo from './ToDo'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button, Alert, ScrollView,Modal,Picker,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
var PickerItem = Picker.Item;
export default class Main extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            toDoList: [],
            toDoInput: '',
            dueDate:'',
            done:false,
            category:[],
            isModal : false,
            selectCate:'',
            inputcate:''
        }
    }

    addNote() {
        if (this.state.toDoInput) {
            this.state.toDoList.push({
                note: this.state.toDoInput,
                date: this.state.dueDate, 
                status: this.state.done,
                category: this.state.selectCate
            });
        }
        this.setState({ toDoList: this.state.toDoList });
        this.setState({ toDoInput: '' });
        this.setState({ dueDate: '' });
    }
    check(key) {
        this.state.toDoList[key].status= !this.state.toDoList[key].status
        this.setState({ toDoList: this.state.toDoList });
        console.log(this.state.toDoList[key].status)
    }
    deleteNote(key) {
        this.state.toDoList.splice(key, 1);
        this.setState({ toDoList: this.state.toDoList });
    }
    tambahcategory(){
        this.state.category.push({
            categorya:this.state.inputcate
        })
        this.setState({ isModal: false })
        this.setState({inputcate:''})
        console.log(this.state.category)
    }
    render() {
        let toDoes = this.state.toDoList.map((val, key) => {
            return <ToDo key={key} keyval={key} val={val}
                deleteMethod={() => this.deleteNote(key)} 
                check={()=>this.check(key)}/>
        });
        let categoryItems = this.state.category.map((s, i) => {
            return <Picker.Item key={i} label={s.categorya} value={s.categorya}/>
        });
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='To Do'
                    onChangeText={(toDoInput) => this.setState({ toDoInput })}
                    value={this.state.toDoInput}>
                </TextInput>
                <DatePicker
                    style={{
                        width: 400
                    }}
                    date={this.state.dueDate}
                    mode="date"
                    placeholder="Due Date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { this.setState({ dueDate: date }); }}
                />
                <View style={styles.piccker}>
                <Picker style={{
                        width:380
                    }}
                    selectedValue={this.state.selectCate}
                    onValueChange={(itemValue, itemIndex) => {this.setState({ selectCate: itemValue })}}>
                    {categoryItems}
                </Picker>
                <Button style={{width:20}}
                    onPress={() => {this.setState({ isModal: true })}}
                    title="+">
                </Button>
                </View>
                
                <Modal visible={this.state.isModal} onRequestClose={() => {this.setState({ isModal: false })}}>
                <View style={styles.modalView}> 
                <TextInput style={{width:200}}
                    placeholder='Category'
                    onChangeText={(inputcate) => this.setState({ inputcate })}
                    value={this.state.inputcate}>
                </TextInput>
                 <Button
                    onPress={() => {this.tambahcategory()}}
                    title="tambah">
                </Button> 
                 </View>
                </Modal> 
                <Button style={{marginTop:10}}
                    onPress={this.addNote.bind(this)}
                    title="Tambah ToDo">
                </Button>
                <ScrollView style={styles.scrollContainer}>
                    {toDoes}
                </ScrollView>


            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonTambah: {
        alignItems: 'flex-end',
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    modalView: {
        height:200,
        backgroundColor:'#aaa',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    piccker: {
         flexDirection: 'row',
    }
});
