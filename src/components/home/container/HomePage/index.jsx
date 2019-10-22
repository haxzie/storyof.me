import React, { Component } from 'react'
import Container from '../../../shared/Container';
import styles from './styles.module.scss';
import SidePanel from '../SidePanel';
import EditorView from '../Editor';

export default class HomePage extends Component {
    render() {
        return (
            <div className={styles.HomeLayout}>
                <SidePanel/>
                <EditorView/>
            </div>
        )
    }
}
