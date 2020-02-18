import React from "react";
import ReactDOM from 'react-dom';
import "./Right_Modal.css";

class RightModal extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showfunction: this.props.isRight_Modal,
    };
  };
  node = React.createRef();
  componentDidMount() {
    if (this.props.isRight_Modal) return this.props.handleShowRight_Modal();
    return this.props.handleCloseRight_Modal();
  };
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showRight_Modal } = this.props;
    if ( (!this.node.contains(e.target) && !showRight_Modal)
    || (this.node.contains(e.target) && showRight_Modal)
    ) return;
    return this.props.handleCloseRight_Modal();
  };
  renderRight_Modal = () => {
    const { showRight_Modal, restoreAllHistory, handleCloseRight_Modal } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showRight_Modal ? 'modal-restore-active' : ''}>
          <div id="modal-container-restore" className={showRight_Modal ? 'restore' :'out'}>
            <div className="modal-background-restore">
              <div className="modal-restore" ref={this.handleRef} onClick={this.handleClick}>
                <h2>Restore All History</h2>
                <p>This action will restore all your todos from history</p>
                <button className="ui button blue" onClick={restoreAllHistory} >
                  Restore
                </button>
                <button className="ui button" onClick={handleCloseRight_Modal}>
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
      this.renderRight_Modal(),
      document.querySelector('#modal')
    );
  };
};

export default RightModal;