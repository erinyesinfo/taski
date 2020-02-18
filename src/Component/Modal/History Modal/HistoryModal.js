import React from "react";
import ReactDOM from 'react-dom';
import "./HistoryModal.css";

import HistoryModalContent from './HistoryModalContent/HistoryModalContent';

class HistoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showfunction: this.props.isHistory_Modal,
    };
  };
  node = React.createRef();
  componentDidMount() {
    if (this.props.isHistory_Modal) {
      return this.props.handleShowHistory_Modal();
    } return this.props.handleCloseHistory_Modal();
  };
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showHistory_Modal, showRight_Modal, showLeft_Modal, showRestore_Modal } = this.props;
    if ( (!this.node.contains(e.target) && !showHistory_Modal)
    || (this.node.contains(e.target) && showHistory_Modal)
    ) {
      return;
    } else if (showRight_Modal || showLeft_Modal || showRestore_Modal) return;
    return this.props.handleCloseHistory_Modal();
  };
  renderHistoryModalContent = () => {
    const { showHistory_Modal, toggleRestore_Modal, handleShowRestore_Modal, handleCloseRestore_Modal, isRestore_Modal, showRestore_Modal, handleRestore, toggleLeft_Modal, handleShowLeft_Modal, handleCloseLeft_Modal, isLeft_Modal, showLeft_Modal, clearAllHistory, toggleRight_Modal,handleShowRight_Modal, handleCloseRight_Modal, isRight_Modal, showRight_Modal, restoreAllHistory, clone } = this.props;
    return <HistoryModalContent showHistory_Modal={showHistory_Modal}
              toggleRestore_Modal={toggleRestore_Modal}
              handleShowRestore_Modal={handleShowRestore_Modal}
              handleCloseRestore_Modal={handleCloseRestore_Modal}
              isRestore_Modal={isRestore_Modal}
              showRestore_Modal={showRestore_Modal}
              handleRestore={handleRestore} // func with params
              // Left Modal
              toggleLeft_Modal={toggleLeft_Modal}
              handleShowLeft_Modal={handleShowLeft_Modal} 
              handleCloseLeft_Modal={handleCloseLeft_Modal}
              isLeft_Modal={isLeft_Modal}
              showLeft_Modal={showLeft_Modal} 
              clearAllHistory={clearAllHistory} 
              // Right Modal
              toggleRight_Modal={toggleRight_Modal}
              handleShowRight_Modal={handleShowRight_Modal} 
              handleCloseRight_Modal={handleCloseRight_Modal}
              isRight_Modal={isRight_Modal}
              showRight_Modal={showRight_Modal}
              restoreAllHistory={restoreAllHistory}
              // this.state.clone
              clone={clone}
            />;
  };
  renderHistory_Modal = () => {
    const { showHistory_Modal } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showHistory_Modal ? 'modal-showHistory_Modal-active' : ''} >
          <div id="modal-showHistory_Modal-container" className={showHistory_Modal ? 'clear-todo' : 'out'} >
            <div className="modal-showHistory_Modal-background">
              <div className="modal-showHistory_Modal" ref={this.handleRef} onClick={this.handleClick}>
                {this.renderHistoryModalContent()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderHistory_Modal(),
      document.querySelector('#modal')
    );
  };
};

export default HistoryModal;
