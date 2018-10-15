import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import PropTypes from 'prop-types';

class QrSendReader extends Component {
  constructor() { 
    super();
    this.nativeQrRead = this.nativeQrRead.bind(this);
  }

  nativeQrRead(event) { 
    this.props.handleScan(event.data);
  }

  handleError(err){
    console.error(err);
  }

  componentWillMount() {
    var runningInIosApp = (window.webkit !== undefined && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.qrScanner !== undefined);
    if(runningInIosApp) { 
      window.addEventListener("qrRead", this.nativeQrRead);
      window.webkit.messageHandlers.qrScanner.postMessage('startQrScan|' + this.props.nativeRect);
    }
  }

  componentWillUnmount() {
    var runningInIosApp = (window.webkit !== undefined && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.qrScanner !== undefined);
    if(runningInIosApp) { 
      window.webkit.messageHandlers.qrScanner.postMessage('stopQrScan');
      window.removeEventListener("qrRead", this.nativeQrRead);
    }
  }

  render(){
    const previewStyle = {
      height: 250,
      width: 250,
    }

    var runningInIosApp = (window.webkit !== undefined && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.qrScanner !== undefined);
    var qrReader = null;

    if(runningInIosApp) {
      qrReader = (<div style={previewStyle}></div>)
    } else {
      qrReader = (<QrReader
        delay={this.props.delay}
        style={previewStyle}
        onError={this.handleError}
        onScan={this.props.handleScan}
      />);
    }

    return(
      <div>
        {qrReader}
      </div>
    )
  }
}

QrSendReader.propTypes = {
  delay: PropTypes.number.isRequired,
  handleScan: PropTypes.func.isRequired,
  nativeRect: PropTypes.string.isRequired,
};

export default QrSendReader;
