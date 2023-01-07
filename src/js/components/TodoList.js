import React from 'react';
import Task from './Task';

export default class TodoList extends React.Component {

  constructor(props){
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggleDone = this.handleToggleDone.bind(this);
  }
  handleRemove(id){
    this.props.callBackRemoveTask(id);
  }
  
  handleToggleDone(id) {
    console.log('TodoList.js isDone OK');
    this.props.callBackToggleDone(id);
    
  }
  render() {
    let tasks = [];
    for(let i in this.props.data){
      tasks.push(<Task key={this.props.data[i].id}
                       id={this.props.data[i].id}
                       text={this.props.data[i].text} onRemove={this.handleRemove}
                       isDone={this.props.data[i].isDone} onDone={this.handleToggleDone}/>);
    }

    return (
      <ul className="list js-todo_list">
        {tasks}
      </ul>
    );
  }
}