import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import PropTypes from 'prop-types';

class QrSendReader extends Component {

  handleError(err){
    console.error(err);
  }

  render(){
    const previewStyle = {
      height: 250,
      width: 250,
    }

    return(
      <div>
        <QrReader
          delay={this.props.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.props.handleScan}
        />
      </div>
    )
  }
}

QrSendReader.propTypes = {
  delay: PropTypes.number.isRequired,
  handleScan: PropTypes.func.isRequired,
};

export default QrSendReader;
