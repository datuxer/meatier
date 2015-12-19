import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import injectTapeEventPlugin from 'react-tap-event-plugin';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  render() {
    const {isAuthenticated, children} = this.props;
    const maxWidth = __PRODUCTION__ ? '100%' : '1000px';
    return (
      <div className={styles.app} style={{maxWidth}}>
        <Header isAuthenticated={isAuthenticated}/>
        <div className={styles.component}>
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}
