import React from "react";
import ReactDOM from 'react-dom';
import "./ClearAll_Modal.css";

class ClearAllModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showfunction: false,
    };
  };
  node = React.createRef();
  componentDidMount() {
    if (this.props.isClearAll_Modal) {
      return this.setState({ showfunction: true }, this.props.handleShowClearAll_Modal);
    } return this.props.handleCloseClearAll_Modal();
  };
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showClearAll_Modal } = this.props;
    if ( (!this.node.contains(e.target) && !showClearAll_Modal)
    || (this.node.contains(e.target) && showClearAll_Modal)
    ) return;
    return this.props.handleCloseClearAll_Modal();
  };
  renderClearAll_Modal = () => {
    const { showClearAll_Modal, clearAll, handleCloseClearAll_Modal } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showClearAll_Modal ? 'modal-active': ''} >
          <div id="modal-container-clearAllTodo" className={showClearAll_Modal ? 'clearAllTodo':'out'}>
            <div className="modal-background-clearAllTodo">
              <div className="modal-clearAllTodo" ref={this.handleRef} onClick={this.handleClick}>
                <h2>Remove All Todos</h2>
                <p>Are you sure you want to remove all your todos</p>
                <button className="ui button negative" onClick={clearAll}>
                  Delete
                </button>
                <button className="ui button" onClick={handleCloseClearAll_Modal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderClearAll_Modal(),
      document.querySelector('#modal')
    );
  };
};

export default ClearAllModal;