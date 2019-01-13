import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const BreachInfo = ({ breach }) => {
    return (
        <div>
            <div>
                <img src={breach.LogoPath} alt={breach.Title}/>
                <h4>{breach.Title}</h4>
            </div>
            <table className="table table-striped">
                <tbody>
                    {
                        Object.keys(breach).reduce((rows, prop) => {
                            let value = breach[prop];
                            if (typeof value !== 'undefined') {
                                let label = prop;
                                let value_cell;

                                if (typeof value === 'boolean') {
                                    value = value === true ? 'Yes' : 'No';
                                } else if (Array.isArray(value)) {
                                    value = value.join(', ');
                                }
                                
                                switch (prop) {
                                    case 'Name':
                                    case 'Title':
                                    case 'LogoPath':
                                        value = null;
                                        break;
                                    case 'AddedDate':
                                        label = 'Added Date';
                                        value = moment(value).format('DD/MM/YYYY HH:mm');
                                        break;
                                    case 'ModifiedDate':
                                        label = 'Modified Date';
                                        value = moment(value).format('DD/MM/YYYY HH:mm');
                                        break;
                                    case 'BreachDate':
                                        label = 'Breach Date';
                                        value = moment(value, "YYYY-MM-DD").format('DD/MM/YYYY');
                                        break;
                                    case 'IsVerified':
                                        label = 'Is Verified?';
                                        break;
                                    case 'IsFabricated':
                                        label = 'Is Fabricated?';
                                        break;
                                    case 'IsSensitive':
                                        label = 'Is Sensitive? ';
                                        break;
                                    case 'IsRetired':
                                        label = 'Is Retired?';
                                        break;
                                    case 'IsSpamList':
                                        label = 'From a Spam List?';
                                        break;
                                    case 'DataClasses':
                                        label = 'Data Types Present';
                                        break;
                                }

                                if (value !== null) {
                                    switch (prop) {
                                        case 'Description':
                                            value_cell = <td dangerouslySetInnerHTML={{ __html: value }}></td>;
                                            break;
                                        default:
                                            value_cell = value !== null ? <td>{value}</td> : null;
                                            break;
                                    }
                                }

                                if (value_cell) {
                                    rows.push(
                                        <tr key={prop}>
                                            <td>{label}</td>
                                            {value_cell}
                                        </tr>
                                    );
                                }
                            }

                            return rows;
                        }, [])
                    }
                </tbody>
            </table>
        </div>
    );
};

BreachInfo.propTypes = {
    breach: PropTypes.object,
}

BreachInfo.defaultProps = {
    breach: {}
}

export default BreachInfo;