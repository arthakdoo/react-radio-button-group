import React from 'react';
import {setNumber, nextNumber} from './actions';
import ReactRadioButtonGroup from 'react-radio-button-group';
import {connect} from 'react-redux';

class AppDisconnected extends React.Component {
    constructor(props) {
        super(props);
        this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);
        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    }

    handleRadioGroupChange(newValue) {
        this.props.setNumber(newValue);
    }

    handleNextButtonClick(e) {
        e.preventDefault();
        this.props.nextNumber();
    }

    render() {
        const radioProps = {
            name: 'number',
            options: ['One', 'Two', 'Three'],
            value: this.props.number,
            onChange: this.handleRadioGroupChange,
            fireOnMount: true
        };

        return (
            <form action="/" method="GET">
                <ReactRadioButtonGroup {...radioProps}/>
                <button onClick={this.handleNextButtonClick}>Next</button>
                <br/>
                <input type="submit"/>
                <div>
                    {window.location.search}
                </div>
            </form>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    setNumber: (number) => dispatch(setNumber(number)),
    nextNumber: (number) => dispatch(nextNumber())
});

const mapStateToProps = (state) => {
    return ({
        number: state.number
    });
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppDisconnected);

export default App;
