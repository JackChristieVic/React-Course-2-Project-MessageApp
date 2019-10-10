
//lab2, task 8
const React = require('react');
const Message = require('./Message.jsx');
class MsgList extends React.Component {
    //const MsgList = (props) => {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    deleteMsg(messageId) {
        this.props.deleteMsgCallback(messageId)
        //console.log("MsgList 17 " + messageId);
    }

    render() {
        return (
            <div>
                {/* {console.log("8" + props.userName)} */}
                <div>
                    <label htmlFor="" className="col-7 col-form-label">
                        Hi, {this.props.userName}
                    </label>
                </div>
                <table className="table table-stripped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th className="w-25" scope="col">#</th>
                            <th className="w-25" scope="col">Names</th>
                            <th className="w-50" scope="col">Messages</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.messages.map((messageArray, index) =>
                                <Message key={messageArray._id}
                                    rowNumber={index + 1}
                                    message={messageArray}
                                    userName={this.props.userName}
                                    deleteMsgCallback={this.props.deleteMsgCallback}
                                />
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}

module.exports = MsgList;