
//lab2, task 8
const React = require('react');
class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editClicked: false,
            messages: this.props.message.msg,
            editedMsg: this.props.message.msg
        };
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleCancelButton = this.handleCancelButton.bind(this);
        this.handleUpdateButton = this.handleUpdateButton.bind(this);
        this.handleUpdateText = this.handleUpdateText.bind(this);
    }

    handleDeleteButton(event) {
        this.props.deleteMsgCallback(this.props.message._id)
        //console.log("15  delete button is clicked");
    }

    handleEditButton(event) {
        this.setState({
            editClicked: true
        });
        //console.log("23 edit handler is clickedd");
    }

    handleCancelButton(event) {
        this.setState({
            editClicked: false
        });
        //console.log("23 edit handler is clickedd");
    }

    handleUpdateButton(event) {
        fetch(`${process.env.API_URL}/msgs/` + this.props.message._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ msg: this.state.editedMsg })
        })
            .then(() => {
                this.setState({
                    messages: this.state.editedMsg,
                    editClicked: false,
                });
            })

            .catch(error => {
                console.log(error);
            });
    }

    handleUpdateText(event) {
        this.setState({
            editedMsg: event.target.value
        });
    }

    render() {
        if ((this.props.userName == this.props.message.name) && (this.state.editClicked == false)) {
            return (
                <tr>
                    <td className="w-15 table-primary" scope="col" >{this.props.rowNumber}</td>
                    <td className="w-25 table-primary" scope="col" >{this.props.message.name}</td>
                    <td className="w-65 table-primary" scope="col" >{this.state.messages}
                        <div className="text-right">
                            <button className="align-items-right btn btn-primary" onClick={this.handleEditButton}>
                                Edit Message
                    </button>
                            &nbsp; &nbsp;
                    <button type="submit" className="align-items-center btn btn-warning" onClick={this.handleDeleteButton}>
                                Delete
                    </button>
                        </div>
                    </td>
                </tr>
            );
        } else if ((this.props.userName == this.props.message.name) && (this.state.editClicked == true)) {
            return (
                <tr>
                    <td className="w-15 table-primary" scope="col" >{this.props.rowNumber}</td>
                    <td className="w-25 table-primary" scope="col" >{this.props.message.name}</td>
                    <td className="w-65 table-primary" scope="col" >
                        <input type="text" value={this.state.editedMsg} onChange={this.handleUpdateText}></input>
                        <div className="text-right">
                            <button className="align-items-right btn btn-primary" onClick={this.handleUpdateButton}>
                                Update
                    </button>
                            &nbsp; &nbsp;
                    <button type="submit" className="align-items-center btn btn-warning" onClick={this.handleCancelButton}>
                                Cancel
                    </button>
                        </div>
                    </td>
                </tr>
            );
        }
        else {
            return (
                <tr>
                    <td className="w-15 table-primary" scope="col" >{this.props.rowNumber}</td>
                    <td className="w-25 table-primary" scope="col" >{this.props.message.name}</td>
                    <td className="w-65 table-primary" scope="col" >{this.props.message.msg}
                    </td>
                </tr>
            );
        }
    }
}

module.exports = Message;