import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';

class Navigation extends Component {
    static propTypes = {
        location: PropTypes.object,
    };

    static get defaultProps() {
        return {
            location: this.location,
        };
    }

    render() {
        return (
            <nav className="nav">
                <div className="nav__item">
                    <Link
                        to={'/about'}
                        className={'nav__link ' + (this.props.location.pathname.startsWith('/about') ? 'active' : 'inactive')}
                    >
                        About the project
                    </Link>
                </div>
                <div className="nav__item">
                    <Link
                        to={'/download'}
                        className={'nav__link ' + (this.props.location.pathname.startsWith('/download') ? 'active' : 'inactive')}
                    >
                        Download data
                    </Link>
                </div>
                <div className="nav__item">
                    <Link
                        to={'/getinvolved'}
                        className={'nav__link ' + (this.props.location.pathname.startsWith('/getinvolved') ? 'active' : 'inactive')}
                    >
                        How to get involved
                    </Link>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);
