import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task,
      isCompleted: this.props.completed
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleRemove() {
    // second arg just for checking duplicate in history
    this.props.removeTodo(this.props.id, this.props.task);
  };
  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });  
  };
  handleUpdate(evt) {
    const duplicateTodo = this.props.todos.find(todo => todo.task === this.state.task);
    evt.preventDefault();
    if (this.state.task === '') {
      return alert('You need to enter a task!');
    } else if (duplicateTodo) {
      return alert('You already entred the same task!');
    }
    //take new task data and pass up to parent
    this.props.updateTodo(this.props.id, this.state.task);
    this.setState({ isEditing: false }, this.props.completed ? this.handleToggle: null);
  };
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value.toLowerCase().substring(0, 64).replace(/[^a-zA-Z0-9 '’]/g, '')
    });
  };
  handleToggle() {
    // line through
    setTimeout(() => this.props.toggleTodo(this.props.id), 100);
  };
  render() {
    const { completed } = this.props;
    let result;
    if (this.state.isEditing) {
      result = (
        <CSSTransition key='editing' timeout={300} classNames='form'>
          <form className='Todo-edit-form' onSubmit={this.handleUpdate}>
            <input
              type='text'
              name='task'
              value={this.state.task}
              onChange={this.handleChange}
              autoFocus
              className='_input'
            />
            <button type='submit' disabled={this.state.task === '' ? true : false}>Save</button>
          </form>
        </CSSTransition>
      );
    } else if (this.props.todos === []) return null;
    else {
      result = this.props.todos.map(todo => {
        if (todo.id === this.props.id) {
          if (!todo.completedTodos) {
            return (
              <CSSTransition key='normal' timeout={300} classNames='task-text'>
                <div className=''>
                  <li className={todo.task.length > 40 ? 'Todo-task large' : 'Todo-task'} 
                    onClick={this.handleToggle}>
                    {this.props.task}
                  </li>
                </div>
              </CSSTransition>
            );
          } else if (todo.completedTodos && this.props.showTodos) {
            return (
              <CSSTransition key='normal' timeout={300} classNames='task-text'>
                <li className={todo.completedTodos.length > 40 ? 'Todo-task large' : 'Todo-task'}
                  onClick={this.handleToggle}>
                  {this.props.completedTodos}
                </li>
              </CSSTransition>
            );
          }
        } return null;
      });
    }
    let todoClass = completed ? 'Todo completed' : 'Todo'
    return (
      <React.Fragment>
        {!completed ? (
          <TransitionGroup className={todoClass}>
            {result}
            <div className='Todo-buttons'>
              <button onClick={this.toggleForm}>
                <i className='fas fa-pen' />
              </button>
              <button onClick={this.handleRemove}>
                <i className='fas fa-trash' />
              </button>
            </div>
          </TransitionGroup>
            ): completed && (
            <React.Fragment>
              {this.props.showTodos ? (
                <TransitionGroup className={todoClass}>
                  {result}
                  {completed && this.props.showTodos ? (
                    <div className='Todo-buttons'>
                      <button onClick={this.toggleForm}>
                        <i className='fas fa-pen' />
                      </button>
                      <button onClick={this.handleRemove}>
                        <i className='fas fa-trash' />
                      </button>
                    </div>
                  ): ''}
                </TransitionGroup>
              ) : (
                <React.Fragment>
                    {!completed && !this.props.showTodos ? (
                      <React.Fragment>
                          {result}
                          <div className='Todo-buttons'>
                            <button onClick={this.toggleForm}>
                              <i className='fas fa-pen' />
                            </button>
                            <button onClick={this.handleRemove}>
                              <i className='fas fa-trash' />
                            </button>
                          </div>
                      </React.Fragment>
                    ): ''}
                </React.Fragment>
                )
              }
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
export default Todo;
