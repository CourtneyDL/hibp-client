import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ count, failed }) => (
    <div className="container counter">
        <span className={`counter__text ${failed ? 'counter__text--failed' : ''}`}>{`${count} Click${count !== 1 ? 's' : ''}`}</span>
    </div>
);

Counter.propTypes = {
    count: PropTypes.number,
    failed: PropTypes.bool,
}

Counter.defaultProps = {
    count: 0,
    failed: false,
}

export default Counter;