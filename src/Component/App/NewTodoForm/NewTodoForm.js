import React, { Component } from "react";
import uuid from "uuid/v4";
import "./NewTodoForm.css";

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value.toLowerCase().substring(0, 64).replace(/[^a-zA-Z0-9 '’]/g, '')
    });
  }
  handleSubmit(evt) {
    const duplicateTodo = this.props.todos.find(todo => todo.task === this.state.task);
    let d = new Date(), hours = d.getHours(), minutes = d.getMinutes();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd<10) dd = '0'+dd
    if (mm<10) mm = '0'+mm

    if (hours < 10) { hours = '0' + hours}
    if (minutes < 10) { minutes = '0' + minutes}

    const day = mm + '-' + dd + '-' + yyyy;
    const time = `${hours}:${minutes} H/MN`;

    evt.preventDefault();
    if (this.state.task === '') {
      return alert('You need to enter a task!');
    } else if (duplicateTodo) {
      return alert('You already entred the same task!');
    } else if (this.state.task.length > 65) {
      return alert('sorry max value is 65');
    }
    
    this.props.createTodo({ ...this.state, id: uuid(), completed: false, day, time })
    this.setState({ task: "" })
  }
  render() {
    const btn = this.state.task === '' ? true : false;
    return (
      <form className='NewTodoForm' onSubmit={this.handleSubmit}>
        <label htmlFor='task'>New Todo</label>
        <input
          type='text'
          placeholder='New Todo'
          id='task'
          name='task'
          value={this.state.task}
          onChange={this.handleChange}
          className='_input'
        />
        <button type='submit' disabled={btn} className={this.state.task === '' ? 'handleInp' : ''}>
          Add Todo
        </button>
      </form>
    );
  };
};

export default NewTodoForm;
