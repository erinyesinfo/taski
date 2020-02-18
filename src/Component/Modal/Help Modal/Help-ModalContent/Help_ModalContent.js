import React from "react";
import "./Help_ModalContent.css";
import Colors from './Colors/Colors';

class HelpModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTodo: false,
      editTodo: false,
      completeTodo: false,
      clearAllTodos: false,
      showCompleted: false,
      history: false,
      contact: false,
      setting: false,
      color: ''
    };
  };
  // 1 add todo
  handleToggleAddTodo = () => this.setState(st => ({ addTodo: !st.addTodo }) );
  // 2 edit todo
  handleToggleEditTodo = () => this.setState(st => ({ editTodo: !st.editTodo }) );
  // 3 complete todo
  handleToggleCompleteTodo = () => this.setState(st => ({ completeTodo: !st.completeTodo }) );
  // 4 clear all
  handleToggleClearAllTodos = () => this.setState(st => ({ clearAllTodos: !st.clearAllTodos }) );
  // 5 show completed
  handleToggleShowCompleted = () => this.setState(st => ({ showCompleted: !st.showCompleted }) );
  // 6 history
  handleToggleHistory = () => this.setState(st => ({ history: !st.history }) );
  // 7 contact
  handleToggleContact = () => this.setState(st => ({ contact: !st.contact }) );
  // 8 setting
  handleToggleSetting = () => this.setState(st => ({ setting: !st.setting }) );
  handleChange = e => this.setState({ color: e.target.value.replace('#', '') });
  validateColor = strColor => {
    var s = new Option().style;
    s.color = strColor;
    return s.color === strColor;
  };
  isHexColor = hex => {
    if ( (typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex)))
    || (typeof hex === 'string' && hex.length === 3 && !isNaN(Number('0x' + hex)))
    || (typeof hex === 'string' && hex.length === 4 && !isNaN(Number('0x' + hex)))
    ) return hex;
  };
  handleError = () => alert('sorry this color is not valid!');
  handleSubmit = e => {
    e.preventDefault();
    this.validateColor(this.state.color) ?
      this.props.handleColor(this.state.color):
    this.isHexColor(this.state.color) ?
      this.props.handleColor('#' + this.state.color) : this.handleError();
  };
  renderHelpModalContent = () => {
    const { handleColor, completed, storeColor, handleChangeStoreColor, colorTime, popUpColorMessage } = this.props;
    return (
      <React.Fragment>
        <div className='help-header'>
          <h2>
            {this.state.setting ? 'Change Background Color':'App Guid'}
          </h2>
          <div className='help-setting-btn'>
            <button className='ui button' onClick={this.handleToggleSetting}>
              {this.state.setting ? 'Back': 'Setting'}
            </button>
          </div>
        </div>
        {this.state.setting ? (
          <div className='help-colors'>
            <span className='help-localStorage'>
              <input type='checkbox' id='help-localStorage-input'
                onClick={popUpColorMessage} value={storeColor}
                onChange={handleChangeStoreColor} />
              <label htmlFor='help-localStorage-input'>
                &nbsp;Save this color as default to localStorage
              </label>
            </span>
            <Colors handleColor={handleColor} colors={['#ff6666', '#0099e5', '#34bf49', '#00a98f', '#000000', '#371777', '#8a7967', '#6a737b', '#ff9900', '#146eb4', '#537b35', '#990033', '#bfca02', '#013ca6', '#a626aa', '#00b2a9', '#629aa9', '#2a5934', '#ffb900', '#0033a1', '#00ad45', '#543729', '#d52685', '#ced7df']} />
            {storeColor && colorTime ? (
              <div className={colorTime ? 'myId timeoutMessage': 'timeoutMessage'}>
                <span>This action will save color to localStorage</span>
              </div>
            ): null}
            <div className='help-colors-footer'>
              <h3>Add Your Own Color</h3>
              {completed() > 4 ? (
                null
              ):(
                <p className='help-p-addOwnColor'>
                  in order to add your own color you will need to complete 5 todos
                </p>
              )}
              <form className='help-form' onSubmit={this.handleSubmit}>
                <input className='help-input-color' type='text' placeholder='Enter a valid color'
                  value={this.state.color} onChange={this.handleChange}
                  disabled={completed() > 4 ? false: true} />
                <div className='help-div-save'>
                  <button className='ui button'
                    disabled={completed() > 4 ? false: true}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        ): (
          <React.Fragment>
            <div className="help-info">
              <div className="help-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non fuga omnis a sed impedit explicabo.
              </div>
            <ul className='help-ul'>
              <li className={this.state.addTodo ? 'help-fLi-color':'help-fLi'}
                onClick={this.handleToggleAddTodo}>
                <span className={this.state.addTodo ? 'help-minus':'help-plus'}>
                  {this.state.addTodo ? '-':'+'}
                </span>
                Add Todo
              </li>
              {this.state.addTodo ? (
                <div className='help-div'>
                  Add todo will let you add one todo each time
                  <br />You are not allowed: 
                  <ul className='help-ul-div-ul'>
                    <li>to add more than 64 character(this is todo app not a newspaper)</li>
                    <li>to add empty todo</li>
                    <li>to add todo that already exist</li>
                  </ul>
                </div>
              ) : null
              /* Edit Todo */}
              <li className={this.state.editTodo ? 'help-li-color':'help-li'}
                onClick={this.handleToggleEditTodo}>
                <span className={this.state.editTodo ? 'help-minus':'help-plus'}>
                  {this.state.editTodo ? '-':'+'}
                </span>
                Edit Todo
              </li>
              {this.state.editTodo ? (
              <div className='help-div'>
                Edit todo will let you edit one todo each time
                <br />You are not allowed: 
                <ul className='help-ul-div-ul'>
                  <li>to edit and save an empty todo</li>
                  <li>to edit and add todo that already exist</li>
                  <li>to edit and add more than 64 character(this is todo app not a newspaper)</li>
                </ul>
              </div>
              ) : null
              /* Complete Todo */}
              <li className={this.state.completeTodo ? 'help-li-color':'help-li'}
                onClick={this.handleToggleCompleteTodo}>
                <span className={this.state.completeTodo ? 'help-minus':'help-plus'}>
                  {this.state.completeTodo ? '-':'+'}
                </span>
                Complete Todo
              </li>
              {this.state.completeTodo ? (
              <div className='help-div'>
                Complete todo will let you complet any todos by click on the element
                <br />You are not allowed: 
                <ul className='help-ul-div-ul'>
                  <li>to click on completed todo if there is no todos</li>
                </ul>
              </div>
              ) : null
              /* Clear All */}
              <li className={this.state.clearAllTodos ? 'help-li-color':'help-li'}
                onClick={this.handleToggleClearAllTodos}>
                <span className={this.state.clearAllTodos ? 'help-minus':'help-plus'}>
                  {this.state.clearAllTodos ? '-':'+'}
                </span>
                Clear All
              </li>
              {this.state.clearAllTodos ? (
              <div className='help-div'>
                Clear all will let you remove all your todos and store them in history
                <br />You are not allowed: 
                <ul className='help-ul-div-ul'>
                  <li>to store an existing todo in your history</li>
                </ul>
              </div>
              ) : null
              /* Show Completed */}
              <li className={this.state.showCompleted ? 'help-li-color':'help-li'}
                onClick={this.handleToggleShowCompleted}>
                <span className={this.state.showCompleted ? 'help-minus':'help-plus'}>
                  {this.state.showCompleted ? '-':'+'}
                </span>
                Show Completed
              </li>
              {this.state.showCompleted ? (
              <div className='help-div' >
                Show completed will let you see all your completed todos
                <br />You are not allowed: 
                <ul className='help-ul-div-ul' >
                  <li>to click on completed todo if there is no completed todos</li>
                </ul>
              </div>
              ) : null
              /* History */}
              <li className={this.state.history ? 'help-li-color':'help-li'}
                onClick={this.handleToggleHistory}>
                <span className={this.state.history ? 'help-minus':'help-plus'}>
                  {this.state.history ? '-':'+'}
                </span>
                History
              </li>
              {this.state.history ? (
              <div className='help-div'>
                History will let you see all your removed todos and the time they have been deleted
                plus you can restore one todo by name each time or restore all todos from history or clear all history
                <br />You are not allowed: 
                <ul className='help-ul-div-ul'>
                  <li>to restore an duplicate todo</li>
                </ul>
              </div>
              ) : null}
              {/* Contact */}
              <li className={this.state.contact ? 'help-li-color':'help-li'}
                onClick={this.handleToggleContact}>
                <span className={this.state.contact ? 'help-minus':'help-plus'}>
                  {this.state.contact ? '-':'+'}
                </span>
                Contact
              </li>
              {this.state.contact ? (
              <div className='help-div'>
                Hello, if you want to contact me about any feature i will be glad to try it out
                <br />Business email: 
                <ul className='help-ul-div-ul'>
                  <li>erinyesinfo@gmail.com</li>
                </ul>
              </div>
              ) : null}
            </ul>
            </div>
            <div className="help-ok">
              <button onClick={this.props.handleCloseModal}
                className='ui button'>
                OK
              </button>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };
  render() {
    return this.renderHelpModalContent();
  };
};

export default HelpModalContent;
