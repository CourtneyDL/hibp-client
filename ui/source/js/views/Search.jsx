import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PasswordResults from 'containers/Results/PasswordResults';
import EmailResults from 'containers/Results/EmailResults';
import SearchForm from 'containers/Search/SearchForm';
import SearchList from 'containers/Search/SearchList';

class Search extends Component {
    static propTypes = {
        failed: PropTypes.bool,
    };

    static defaultProps = {
        failed: false,
    };

    render () {
        return (
            <div className="container">
                <SearchForm/>
                {this.props.failed ?
                    <div className="alert alert-danger">Sorry, an error occurred performing your search.</div>
                    : null}
                <SearchList/>
                <PasswordResults/>
                <EmailResults/>
            </div>
        );
    }
}

export default connect(
    state => ({
        failed: state.search.failed,
    }),
)(Search);