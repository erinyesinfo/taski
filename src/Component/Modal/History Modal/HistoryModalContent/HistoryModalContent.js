import React, { Component } from 'react';
import './HistoryModalContent.css';

/* Modals */
import LeftModal from './Modal/Left Modal/Left_Modal';
import RightModal from './Modal/Right Modal/Right_Modal';
import RestoreModal from './Modal/Restore Modal/Restore_Modal';

class HistoryModalContent extends Component {
    renderLeftModal = () => {
        const { handleShowLeft_Modal, handleCloseLeft_Modal, isLeft_Modal, showLeft_Modal, clearAllHistory } = this.props;
        return (
            <LeftModal handleShowLeft_Modal={handleShowLeft_Modal}
                handleCloseLeft_Modal={handleCloseLeft_Modal}
                isLeft_Modal={isLeft_Modal}
                showLeft_Modal={showLeft_Modal}
                clearAllHistory={clearAllHistory}
            />
        );
    };
    renderRightModal = () => {
        const { handleShowRight_Modal, handleCloseRight_Modal, isRight_Modal, showRight_Modal, restoreAllHistory } = this.props;
        return (
            <RightModal handleShowRight_Modal={handleShowRight_Modal}
                handleCloseRight_Modal={handleCloseRight_Modal}
                isRight_Modal={isRight_Modal}
                showRight_Modal={showRight_Modal}
                restoreAllHistory={restoreAllHistory}
            />
        );
    };
    renderHistory = () => {
        const { clone, toggleRestore_Modal, isRestore_Modal } = this.props;
        if (clone.length === 0) {
            return <h1 className='history-header'>Your History Is Empty!</h1>;
        }
        return clone.map((oldTodo, i) => {
            i++;
            return (
                <React.Fragment key={oldTodo.id}>
                    <li className={oldTodo.task.length > 30 ? 'largerTodo' : 'normalTodo'}>
                        {i + '. ' + oldTodo.task}
                    </li>
                    <span className='history-time'>
                        <div className='day'>
                            {oldTodo.day}
                        </div>
                        <div className='time'>
                            {oldTodo.time}
                        </div>
                    </span>
                    <button className='button ui gray' onClick={() => toggleRestore_Modal(oldTodo)}>
                        Restore
                    </button>
                    {isRestore_Modal ?
                        this.renderRestoreModal()
                    :null}
                </React.Fragment>
            );
        });
    };
    renderRestoreModal = () => {
        const { handleShowRestore_Modal, handleCloseRestore_Modal, isRestore_Modal, showRestore_Modal, handleRestore } = this.props;
        return (
            <RestoreModal handleShowRestore_Modal={handleShowRestore_Modal}
                handleCloseRestore_Modal={handleCloseRestore_Modal}
                isRestore_Modal={isRestore_Modal}
                showRestore_Modal={showRestore_Modal}
                // func with params
                handleRestore={handleRestore}
            />
        );
    };
    render() {
        const { isLeft_Modal, isRight_Modal, toggleLeft_Modal, toggleRight_Modal } = this.props;
        return (
            <React.Fragment>
                <h2>History</h2>
                <div className='dvBtnWrapper'>
                  <div className='clearHistory'>
                    <button id="clear" className='clearBtn ui button red' onClick={toggleLeft_Modal}>
                      Clear History
                    </button>
                    {isLeft_Modal ?
                      this.renderLeftModal()
                    : null}
                  </div>
                  { <div className='restoreAll'>
                    <button id="restore" className='restoreBtn ui button blue' onClick={toggleRight_Modal}>
                      Restore All
                    </button>
                    {/*  */}
                    {isRight_Modal ?
                      this.renderRightModal()
                    : null}
                  </div> }
                </div>
                <br />
                <div className='history-container'>
                  <ul className='history-ul'>
                    {this.renderHistory()}
                  </ul>
                </div>
                {/* Modals */}
            </React.Fragment>
        );
    };
};

export default HistoryModalContent;
