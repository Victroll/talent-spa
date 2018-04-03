import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import List from 'react-toolbox/lib/list/List';
import * as Actions from '../actions';
import ListItem from 'react-toolbox/lib/list/ListItem';

class ModalList extends React.Component {
    constructor() {
        super();
        this.loadTree = this.loadTree.bind(this);
    }

    loadTree(name) {
        this.props.loadTalentTree(name);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.isOpen && this.props.isOpen)
            this.props.fetchTalentList();

    }

    render() {
        return (
            <Dialog className='modal' title='Talent trees list'
            actions={ [] } active={ this.props.isOpen }
            onOverlayClick={ this.props.closeModal } >
                <List selectable ripple>
                    { this.props.treeList.map((tree, index) => 
                        <ListItem caption={ tree } key={ index } 
                        onClick={ () => this.loadTree(tree) }/>) }
                </List>
            </Dialog>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        isOpen: store.modalList.isOpen,
        treeList: store.modalList.treeList
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(Actions.closeModalList()),
        fetchTalentList: () => dispatch(Actions.fetchTalentTreeList()),
        loadTalentTree: (index) => dispatch(Actions.loadTalentTree(index))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalList);