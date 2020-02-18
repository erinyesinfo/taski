import React from "react";
import ReactDOM from 'react-dom';
import "./HelpModal.css";

import HelpModalContent from './Help-ModalContent/Help_ModalContent';

class HelpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showfunction: this.props.isSimpleModal,
    };
  };
  node = React.createRef();
  componentDidMount() {
    if (this.props.isSimpleModal) return this.props.handleShowModal();
    return this.props.handleCloseModal();
  };
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { showModal } = this.props;
    if ( (!this.node.contains(e.target) && !showModal)
    || (this.node.contains(e.target) && showModal)
    ) return;
    return this.props.handleCloseModal();
  };
  renderHelpModalContent = () => {
    const { handleColor, color, completed, storeColor, handleChangeStoreColor, colorTime, popUpColorMessage } = this.props;
    return <HelpModalContent handleCloseModal={this.props.handleCloseModal}
              showModal={this.state.showModal}
              colorTime={colorTime}
              popUpColorMessage={popUpColorMessage}
              handleColor={handleColor}
              color={color}
              storeColor={storeColor}
              handleChangeStoreColor={handleChangeStoreColor}
              completed={completed}
            />;
  };
  renderHelpModal = () => {
    const { showModal } = this.props;
    return (
      <React.Fragment>
        {
          this.state.showfunction
        }
        <div className={showModal ? 'modal-active':''}>
          <div id="modal-container-guid" className={showModal ? 'guid':'out'}>
            <div className="modal-background-guid">
              <div className="modal-guid" ref={this.handleRef} onClick={this.handleClick}>
                {this.renderHelpModalContent()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderHelpModal(),
      document.querySelector('#modal')
    );
  }
}

export default HelpModal;
