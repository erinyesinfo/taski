import React from "react";
import ReactDOM from 'react-dom';
import "./Restore_Modal.css";

class RestoreModal extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showfunction: this.props.isRestore_Modal,
    };
  };
  node = React.createRef();
  componentDidMount() {
    if (this.props.isRestore_Modal) return this.props.handleShowRestore_Modal();
    return this.props.handleCloseRestore_Modal();
  };
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = () => {
    const { showRestore_Modal } = this.props;
    if ((this.node.className === 'modal-restoreOnetodo') && showRestore_Modal) return;
    return this.props.handleCloseRestore_Modal();
  };
  handleRestore = () => {
    this.props.handleRestore(this.props.oldTodo, this.props.task);
    this.props.handleCloseRestore_Modal();
  };
  renderRestore_Modal = () => {
    const { showRestore_Modal, handleCloseRestore_Modal } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showRestore_Modal ? 'modal-restoreOnetodo-active':''}>
          <div id="modal-container-restoreOnetodo" className={showRestore_Modal ? 'restoreOnetodo':'out'}>
            <div className="modal-background-restoreOnetodo">
              <div className="modal-restoreOnetodo" ref={this.handleRef} onClick={this.handleClick}>
                <h2>Restore Your Todo</h2>
                <p>This action will restore your todo</p>
                <button className="ui button green" onClick={this.handleRestore} >
                  Restore
                </button>
                <button className="ui button" onClick={handleCloseRestore_Modal}>
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
      this.renderRestore_Modal(),
      document.querySelector('#modal')
    );
  };
};

export default RestoreModal;