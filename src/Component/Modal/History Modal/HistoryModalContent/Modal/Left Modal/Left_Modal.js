import React from "react";
import ReactDOM from 'react-dom';
import "./Left_Modal.css";

class LeftModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showfunction: this.props.isLeft_Modal,
    };
  }
  node = React.createRef();
  componentDidMount() {
    if (this.props.isLeft_Modal) return this.props.handleShowLeft_Modal();
    return this.props.handleCloseLeft_Modal();
  };
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showLeft_Modal } = this.props;
    if ( (!this.node.contains(e.target) && !showLeft_Modal)
    || (this.node.contains(e.target) && showLeft_Modal)
    ) return;
    return this.props.handleCloseLeft_Modal();
  };
  renderLeft_Modal = () => {
    const { showLeft_Modal, clearAllHistory, handleCloseLeft_Modal } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showLeft_Modal ? 'modal-clear-active' : ''} >
          <div id="modal-container-clear" className={showLeft_Modal ? 'clear' : 'out'} >
            <div className="modal-background-clear">
              <div className="modal-clear" ref={this.handleRef} onClick={this.handleClick}>
                <h2>Clear History</h2>
                <p>Are you sure you want to clear your history</p>
                <button className="ui button negative" onClick={clearAllHistory}>
                  Delete
                </button>
                <button className="ui button" onClick={handleCloseLeft_Modal}>
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
      this.renderLeft_Modal(),
      document.querySelector('#modal')
    );
  };
};

export default LeftModal;
