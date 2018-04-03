import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import { Row, Col} from 'react-flexbox-grid';
import * as Actions from '../actions';

class ModalSave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'New Talent Tree'
        };

        this.updateName = this.updateName.bind(this);
        this.saveTalentTree = this.saveTalentTree.bind(this);

        this.actions = [
            { label: 'Save', id: 'save-talent-tree', onClick: this.saveTalentTree },
            { label: 'Cancel', id: 'cancel-talent-tree', onClick: this.props.closeModal }
        ];
    }

    saveTalentTree() {
        this.props.saveTalents(this.state.name);
    }

    updateName(name) {
        this.setState({...this.state,
            name: name
        });
    }

    render() {
        return (
            <Dialog className='modal' title='Save Talent Tree'
            actions={ this.actions } active={ this.props.isOpen }
            onOverlayClick={ this.props.closeModal } >
                <Row>
                    <Col xs={ 12 }>
                        <Input id='talent-tree-name' type='text' label='Name' value={ this.state.name } 
                        onChange={ (value) => this.updateName(value) } />
                    </Col>
                </Row>  
            </Dialog>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        isOpen: store.modalSave.isOpen
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(Actions.closeModalSave()),
        saveTalents: (name) => dispatch(Actions.saveTalents(name))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalSave);