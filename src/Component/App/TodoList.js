import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NewTodoForm from "./NewTodoForm/NewTodoForm";
import Todo from "./Todo/Todo";
import "./TodoList.css";

/* Images */
import Beer from '../Images/beer_celebration.svg';
import Hoomer from '../Images/Hoomer.jpg';

/* Helper */
import { array_move, handleDate } from './Helpers/Helpers';

/* Modals */
import HelpModal from '../Modal/Help Modal/HelpModal';
import ClearAllModal from '../Modal/ClearAll Modal/ClearAll_Modal';
import HistoryModal from '../Modal/History Modal/HistoryModal';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(localStorage.getItem("todos") || "[]"),
      showTodos: false,
      clone: JSON.parse(localStorage.getItem("clone") || "[]"),
      restoreTodosHelper: {},
      /* help_Modal */
      isSimpleModal: false,
      showModal: false,
      /* Clear-all-todos_Modal */
      isClearAll_Modal: false,
      showClearAll_Modal: false,
      /* History_Modal */
      isHistory_Modal: false,
      showHistory_Modal: false,
      /* Clear-all-history_Modal */
      isLeftModal: false,
      showLeftModal: false,
      /* Restore-all-todos_Modal */
      isRightModal: false,
      showRightModal: false,
      /* Restore-one-todo_Modal */
      isRestore_Modal: false,
      showRestore_Modal: false,
      color: localStorage.getItem("color") || "#0099e5",
      doNotClose: false,
      time: false,
      colorTime: false,
      storeColor: false,
      task: ''
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }
  componentDidMount() {
    if (this.completed() !== 0) return this.showCompleted();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      const todos = this.state.todos;
      localStorage.setItem("todos", JSON.stringify(todos))
    }
    if (prevState.clone !== this.state.clone) {
      const clone = this.state.clone;
      localStorage.setItem("clone", JSON.stringify(clone))
    }
    if (this.state.storeColor) {
      if (this.state.color && this.state.storeColor) {
        const color = this.state.color;
        localStorage.setItem("color", color)
      }
    }
  };

  create(newTodo) {
    this.setState(st => ({
      todos: [...this.state.todos, newTodo],
      task: newTodo.task,
      time: true,
    }), this.popUpMessage);
  }
  popUpMessage = () => setTimeout(() => this.setState({ time: false }), 800);
  popUpColorMessage = () => {
    this.setState({ colorTime: true })
    setTimeout(() => this.setState({ colorTime: false }), 1500)
  };
  handleDuplicateHistory = cloneHistory => {
    alert('You already have this todo in your history list!');
    this.setState({
      clone: this.state.clone.filter(c => c.task !== cloneHistory)
    });
  };
  remove(id, cloneHistory) {
    // store this in clone object before delete
    const store = this.state.todos.filter(t => t.id === id);
    const removed = this.state.todos.filter(t => t.id !== id);
    this.setState(st => ({
      clone: this.state.clone.find(c => c.task === cloneHistory) ? [...st.clone] : store.concat(...st.clone),
      todos: removed
      })
    );
  };
  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: todo.completed ? !todo.completed : todo.completed,
          task: updatedTask
        };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };
  toggleChange = id => {
    const myTodos = [].concat(this.state.todos);
    
    myTodos.map((todo, i) => {
      if (todo.id === id) {
        if (todo.completed) {
          return array_move(myTodos, i, myTodos.length -1)
        } return array_move(myTodos, i, 0)
      } return null;
    });

    this.setState({ todos: myTodos  });
  };
  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } return todo;
    });
    this.setState({ todos: updatedTodos }, () => this.toggleChange(id) );
  };
  toggleCloneCompletion(id) {
    const updatedTodos = this.state.clone.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed, completedTodos: todo.task };
      } return todo;
    });
    this.setState({ clone: updatedTodos } );
  }
  handleAlert = () => alert('Sorry you need to complete some tasks before you press show complete tasks');
  showCompleted = () => this.setState(st => ({ showTodos: !st.showTodos }) );
  closeCompleted = () => this.setState({ showTodos: false });
  
  /* (Congrats || You have no todos) || null */
  timeToChill = () => {
    const timeToChill = (Math.floor((this.completed() / this.state.todos.length) * 100));
    if (timeToChill === 100) {
      return (
        <div className='todoList-timeToChill'>
          <img src={Beer} alt='beer_celebration' width='150' />
          <h5>Time to chill! You have no todos.</h5>
        </div>
        );
    } else if (this.state.todos.length === 0) {
      return (
      <div className='todoList-noTodos'>
        <img src={Hoomer} alt='Hoomer' width='150' />
        <h5>Your day’s still empty...</h5>
        <p>Put in some tasks and make your day!</p>
      </div>
      );
    } return null;
  };

  /* Pending Todos */
  pending = () => {
    const item = this.state.todos.filter(item => !item.completed)
    return item.length;
  };
  pendingLeft = () => {
    const pendingTask = (Math.floor((this.pending() / this.state.todos.length) * 100));
    return (
      // eslint-disable-next-line use-isnan
      Number.isNaN(pendingTask) || pendingTask === 0 ? null : (
        <div className='todoList-pendingTask'>
          You have <span>{(Math.floor(this.pending()))}</span> pending items:
        </div>
      )
    );
  };

  /* Completed todos by percentage */
  completed = () => {
    const item = this.state.todos.filter(item => item.completed)
    return item.length;
  };
  completedPercentage = () => {
    const completedTask = (Math.floor((this.completed() / this.state.todos.length) * 100));
    return (
      // eslint-disable-next-line use-isnan
      Number.isNaN(completedTask) || completedTask === 0 ? null : (
        <div className='todoList-completedTasks'>
          Completed tasks: <span>{(Math.floor((this.completed() / this.state.todos.length) * 100)) + "%"}</span>
        </div>
      )
    );
  };

  taskLength = () => {
    const item = this.state.todos.map(item => item.task.length);
    if (item > 40) return item;
    if (item instanceof Array) {
      return item.some(i => i > 40)
    } return false;
  };
  handleError = () => this.setState({ showTodos: true });
  /* Clear Todos */
  clearAll = () => {
    if (this.state.todos.length === 0) return alert('sorry your todos is empty');
    // else
    this.state.todos.map(todo => {
      return this.remove(todo.id, todo.task)
    });
    setTimeout(() => this.setState({ todos: [], showTodos: false }, this.handleCloseClearAll_Modal ), 50);
  };
  /* Clear History */
  clearAllHistory = () => {
    if (this.state.clone.length === 0) return alert('sorry your history is empty')
    // else
    setTimeout(() => this.setState({ clone: [] }, this.handleCloseLeft_Modal), 50);
  };

  handleChangeStoreColor = () => this.setState(st => ({ storeColor: !st.storeColor }) );
  handleColor = color => {
    if (this.state.color === color) return alert('hi, i will not bother my self rerender the state because you already have the same color');
    // else
    this.setState({ color }, this.handleCloseModal);
  };

  /* Show ?_Modal */
  toggleSimpleModal = () => this.setState({ isSimpleModal: true });
  handleShowModal = () => this.setState({ showModal: true });
  handleCloseModal = () => {
    setTimeout(() => 
      this.setState({ showModal: false , isSimpleModal: false })
    , 10);
  };
  renderHelpModal = () => {
    return (
      <HelpModal isSimpleModal={this.state.isSimpleModal}
        handleShowModal={this.handleShowModal} 
        handleCloseModal={this.handleCloseModal}
        showModal={this.state.showModal}
        colorTime={this.state.colorTime}
        popUpColorMessage={this.popUpColorMessage}
        handleColor={this.handleColor}
        color={this.state.color}
        storeColor={this.state.storeColor}
        handleChangeStoreColor={this.handleChangeStoreColor}
        completed={this.completed}
      />
    );
  };
  
  /* Show ClearAll_Modal */
  toggleClearAll_Modal = () => this.setState(
    { isClearAll_Modal: true, doNotClose: this.state.showTodos ? true: false, showTodos: true }
  );
  handleShowClearAll_Modal = () => this.setState({ showClearAll_Modal: true });
  handleCloseClearAll_Modal = () => this.setState({ showClearAll_Modal: false, isClearAll_Modal: false, showTodos: this.state.doNotClose });
  renderClearAll_Modal = () => {
    return (
      <ClearAllModal handleShowClearAll_Modal={this.handleShowClearAll_Modal}
        handleCloseClearAll_Modal={this.handleCloseClearAll_Modal}
        showClearAll_Modal={this.state.showClearAll_Modal}
        clearAll={this.clearAll}
        isClearAll_Modal={this.state.isClearAll_Modal}
      />
    );
  };

  /* Show History_Modal */
  toggleHistory_Modal = () => this.setState({ isHistory_Modal: true });
  handleShowHistory_Modal = () => this.setState({ showHistory_Modal: true });
  handleCloseHistory_Modal = () => this.setState({ isHistory_Modal: false, showHistory_Modal: false });
  renderHistory_Modal = () => {
    return (
      <HistoryModal clone={this.state.clone}
        handleShowHistory_Modal={this.handleShowHistory_Modal}
        handleCloseHistory_Modal={this.handleCloseHistory_Modal}
        isHistory_Modal={this.state.isHistory_Modal}
        showHistory_Modal={this.state.showHistory_Modal}
        // Restor Modal
        toggleRestore_Modal={this.toggleRestore_Modal}
        handleShowRestore_Modal={this.handleShowRestore_Modal}
        handleCloseRestore_Modal={this.handleCloseRestore_Modal}
        isRestore_Modal={this.state.isRestore_Modal}
        showRestore_Modal={this.state.showRestore_Modal}
        // function to handle restore with params
        handleRestore={this.handleRestore}

        // Left Modal
        toggleLeft_Modal={this.toggleLeft_Modal}
        handleShowLeft_Modal={this.handleShowLeft_Modal} 
        handleCloseLeft_Modal={this.handleCloseLeft_Modal}
        isLeft_Modal={this.state.isLeft_Modal}
        showLeft_Modal={this.state.showLeft_Modal} 
        clearAllHistory={this.clearAllHistory} 
        // Right Modal
        toggleRight_Modal={this.toggleRight_Modal}
        handleShowRight_Modal={this.handleShowRight_Modal} 
        handleCloseRight_Modal={this.handleCloseRight_Modal}
        isRight_Modal={this.state.isRight_Modal}
        showRight_Modal={this.state.showRight_Modal}
        restoreAllHistory={this.restoreAllHistory}        
      />
    )
  };

  /* Show Left_Modal */
  toggleLeft_Modal = () => this.setState({ isLeft_Modal: true });
  handleShowLeft_Modal = () => this.setState({ showLeft_Modal: true });
  handleCloseLeft_Modal = () => this.setState({ showLeft_Modal: false, isLeft_Modal: false });

  /* Show Right_Modal */
  toggleRight_Modal = () => this.setState(
    { isRight_Modal: true, doNotClose: this.state.showTodos ? true:false, showTodos: true }
  );
  handleShowRight_Modal = () => this.setState({ showRight_Modal: true });
  handleCloseRight_Modal = () => this.setState(
    { showRight_Modal: false, isRight_Modal: false, showTodos: this.state.doNotClose }
  );

  /* Show Restore_Modal */
  toggleRestore_Modal = task => this.setState({ isRestore_Modal: true, restoreTodosHelper: task });
  handleShowRestore_Modal = () => this.setState({ showRestore_Modal: true, });
  handleCloseRestore_Modal = () => this.setState({ isRestore_Modal: false, showRestore_Modal: false });

  handleDuplicate = oldTodo => {
    alert('You already have this todo in your list!');
    this.setState({
      clone: this.state.clone.filter(c => c.task !== oldTodo)
    });
  };
  completedClones = () => {
    const item = this.state.clone.filter(item => item.completed);
    return item.length;
  };
  handleRestore = () => {
    const { restoreTodosHelper, todos } = this.state;
    const duplicateTodo = todos.find(todo => todo.task === restoreTodosHelper.task);
    if (duplicateTodo) return this.handleDuplicate(restoreTodosHelper.task);
    
    this.completedClones() !== 0 && todos.map(todo => {
      if (todo.id === restoreTodosHelper.id) return { ...todo, completed: !todo.completed }
      return null;
    }) && this.handleError()
    this.setState({
      todos: [ ...todos, restoreTodosHelper ],
      clone: this.state.clone.filter(c => c.task !== restoreTodosHelper.task)
    }, this.handleCloseRightModal);
  };
  restoreAllHistory = () => {
    if (this.state.clone.length === 0) return alert('sorry your todos history is empty');
    this.state.clone.map(cloneHistory => {
      const store = this.state.clone.filter(t => t.id === cloneHistory.id);
      const removed = this.state.clone.filter(t => t.id !== cloneHistory.id);
      return this.setState(st => ({
        todos: this.state.todos.find(c => c.task === cloneHistory.task) ? [...st.todos] : store.concat(...st.todos),
        clone: removed,
      }));
    });
    setTimeout(() => {
      this.setState(st => ({
        clone: [],
        }), this.handleCloseRight_Modal
      )
    }, 100);
  };

  renderTodosBtns = () => {
    return (
      <React.Fragment>
        <div className='todoList-btns'>
          <button className={this.completed() !== 0 ? 'btnCompleted': 'btnCompleted btnCompletedDisabled'}
            disabled={this.completed() !== 0 ? false: true}
            onClick={this.completed() !== 0 ? this.showCompleted: this.handleAlert}>
            {this.completed() !== 0 ?
              this.state.showTodos ? 'Hide Completed':'Show Completed'
            :'Show Completed'}
          </button>
          <button onClick={this.toggleHistory_Modal}
            className={this.state.clone.length !== 0 ? 'btnHistory': 'btnHistory btnHistoryDisabled'} 
            disabled={this.state.clone.length !== 0 ? false : true}>
            History
          </button>
          <button id="clear-todo"
            className={this.completed() !== 0 || this.pending() !== 0 ?
              'btnClearAll':'btnClearAll btnClearAllDisabled'}
            disabled={this.completed() !== 0 || this.pending() !== 0 ? false: true}
            onClick={this.toggleClearAll_Modal} >
              Clear All
          </button>
        </div>
        {/* <div className='todoList-history-btn'></div> */}
      </React.Fragment>
    );
  };
  render() {
    const todos = this.state.todos.map(todo => {
      return (
        <CSSTransition in={true} key={todo.id} timeout={300} classNames='todo'>
          <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            completedTodos={todo.completedTodos}
            completed={todo.completed}
            removeTodo={this.remove}
            updateTodo={this.update}
            toggleTodo={this.toggleCompletion}
            showTodos={this.state.showTodos}
            todos={this.state.todos}
            clone={this.state.clone}
            taskLength={this.taskLength}
          />
        </CSSTransition>
      );
    });
    let TaskiColor = { backgroundColor: this.state.color };
    return (
      <React.Fragment>
        <div className={this.state.showModal ? 'TodoList hide' : 'TodoList'}
          style={TaskiColor}>
          <div className='todoList-help'>
            <button onClick={this.toggleSimpleModal} id="centered-toggle-button"
              className={this.state.showModal ? 'toggle-true' : 'toggle-button'}>
              ?
            </button>
          </div>
          {/* Header */}
          <h1 className='todoList-header'>
            Get To Work! <span className='span-header'>An Animated Todo List Made With React.</span>
            <span className='span-header_2'>
              {/* today && (time now) */}
              {handleDate().day}: {handleDate().date}.
            </span>
          </h1>
          { /* (Congrats || You have no todos) || null */
            this.timeToChill()
          }
          <NewTodoForm createTodo={this.create} todos={this.state.todos} />
          <ul>
            { /* Pending todos */
              this.pendingLeft()
            }
            <TransitionGroup className='todoList-todos'>{todos}</TransitionGroup>
          </ul>
          <div>
            {this.state.showTodos ?
              /* Completed todos by percentage */
              this.completedPercentage()
            : null}
          </div>
          { /* Todos Btns */
            this.renderTodosBtns()
          }
        </div>
        {/* show each new todo with setTimout */}
        {this.state.time ? (
          <div className={this.state.time ? 'newTodo-timeOut myId': 'newTodo-timeOut'}>
            <span>New todo has been add</span>
          </div>
        ): null}
        {/* Modals */}
        {this.state.isSimpleModal ?
          this.renderHelpModal()
        :null}
        {this.state.isClearAll_Modal ? (
          this.renderClearAll_Modal()
        ): null}
        {this.state.isHistory_Modal ? (
          this.renderHistory_Modal()
        ): null}
      </React.Fragment>
    );
  };
};

export default TodoList;
