import React, { Component } from 'react'
import getImageUrl from '../Utils/Utilities'

class ShowPicModal extends Component {

  componentDidMount() {
    const { showPic } = this.refs;
    showPic.focus();
  }
  handleClick = () => {
    this.props.closePic();
  }

  render() {
    return (
      <React.Fragment>
        <div className="App-modal">
          <div className="modal fade App-show-modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div ref={`showPic`} className="modal-content" tabIndex="-1" onBlur={this.handleClick}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">{this.props.name}</h5>
                  <button type="button" onClick={this.props.closePic} className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img className="App-show-pic" src={getImageUrl(this.props.userList, this.props.name)} alt="Show Pic"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default ShowPicModal