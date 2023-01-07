import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
import TodoCreator from './components/TodoCreater';
import Search from './components/Search';
import _ from 'lodash';

class TodoApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [
        {
          id: this.createHashId(),
          text: 'sample todo1',
          isDone: false
        },
        {
          id: this.createHashId(),
          text: 'sample todo2',
          isDone: false
        }
      ],
      searchText: ''
    };
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.callBackToggleDone = this.callBackToggleDone.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }

  createHashId(){
    return Math.random().toString(36).slice(-16);
  }

  callBackSearch(val) {
    this.setState({
      searchText: val
    });
  }

  callBackRemoveTask(id){
    let data = _.reject(this.state.data, { 'id': id });
    this.setState({
      data: data
    });
  }

  callBackAddTask(val){
    let nextData = this.state.data;
    nextData.push({ id: this.createHashId(), text: val, isDone: false });
    this.setState({
      data: nextData
    });
  }
  
  callBackToggleDone (id) {
   let data = [];

   for(let i in this.state.data) {
    if (this.state.data[i].id === id) {
      //console.log(this.state.data[i].id);
      data = this.state.data[i];
      data.isDone = !(data.isDone);
      this.state.data.splice(i,1,data);
      console.log(this.state.data[i]);
    }
   }
   console.log(this.state.data);
  }
  

  //memo:なぜelmに値が入るのかの理屈：
  //      →renderんとこのmemoでいうと、filterにnumberを引数指定すれば、filter関数内で「numbers」配列がつかえるようになるのと一緒
  filterCollection(elm){
    //memo:最後の引数は基本このようにしておけばよいとのこと
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }

  render() {
    /*
      memo
      ・すべてのタスク1件ごとにfilterColletionをかけていることで、結果としてヒットするタスクのみしか残らないようになっている処理
      ・配列のfilter()メソッドは、既存の配列から指定された条件に該当する要素を持つ新しい配列を作成します。
        例：
        var numbers = [1, 3, 6, 8, 11];

        var lucky = numbers.filter(function(number) {
          return number > 7;
        });
    */
    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;
    // ただし、検索して戻すとdone状態が外れてしまう

    return (
      <div>

        <TodoCreator callBackAddTask={this.callBackAddTask}/>

        <Search callBackSearch={this.callBackSearch} />

        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask} callBackToggleDone={this.callBackToggleDone}/>

      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);