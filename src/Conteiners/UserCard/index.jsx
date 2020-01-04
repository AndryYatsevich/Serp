import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Icon} from 'antd';


class UserCard extends React.Component  { 

    constructor(props) {
        super(props);
        this.state = {
            full: false
        }
    }

    showFull = () => {
        this.setState({
            full: !this.state.full
        })
    }

    render () {
        let nationColor = '';
        const {
            player,
            loyalty,
            star,
            fields,
            resources,
            bonus,
            money,
            result,
            place,
            nation,
            tablet
        } = this.props.user;
    switch (nation) {
        case 'Альбион':
            nationColor = 'albion';
            break;
        case 'Тогава':
            nationColor = 'togava';
            break;
        case 'Крым':
            nationColor = 'krym';
            break;
        case 'Руссвет':
            nationColor = 'russvet';
            break;
        case 'Север':
            nationColor = 'sever';
            break;
        case 'Саксония':
            nationColor = 'saksonia';
            break;
        case 'Поляния':
            nationColor = 'polyania';
            break;
        case 'Фенриз':
            nationColor = 'fenriz';
            break;
        case 'Весна':
            nationColor = 'vesna';
            break;
    }
    
        return (
            this.state.full ? (
                <div>
                    <Row className={`user--item  ${nationColor}`} onClick={this.showFull}>
                        <div className="user--place">
                            {place}
                        </div>
                        <Col xs="4">
                            <div className="user--info">
                                <div className="user--info--item">
                                    {player}
                                </div>
                                <div className="user--info--item">
                                    {nation}
                                </div>
                                <div className="user--info--item">
                                    {tablet}
                                </div>
                            </div>                        
                        </Col>
                        <Col xs="6" md="4">
                            <div className="user-achievements-wrap">
                                <div className="user-achievements">
                                    <div className="user-achievements--item">
                                        <div>
                                            <Icon type="heart" />
                                        </div>
                                        <div>
                                            {loyalty}
                                        </div>
                                    </div>
                                    <div className="user-achievements--item">
                                        <div>
                                            <Icon type="star" />
                                        </div>
                                        <div>
                                            {star}
                                        </div>
                                    </div>
                                    <div className="user-achievements--item">
                                        <div>
                                            <Icon type="global" />
                                        </div>
                                        <div>
                                            {fields}
                                        </div>
                                    </div>
                                    <div className="user-achievements--item">
                                        <div>
                                            <Icon type="experiment" />
                                        </div>
                                        <div>
                                            {resources}
                                        </div>
                                    </div>
                                    <div className="user-achievements--item">
                                        <div>
                                            <Icon type="gift" />
                                        </div>
                                        <div>
                                        {bonus}
                                        </div>
                                    </div>
                                    <div className="user-achievements--item">
                                        <div>
                                            <Icon type="dollar" />
                                        </div>
                                        <div>
                                            {money}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="2" className={'hidden-icon'}>
                            Иконка
                        </Col>
                        <Col xs="2">
                            <div className="result-wrap">
                                <div className={`result-border  ${nationColor}`}>
                                    {result}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div>
                    <Row className={`user--item   ${nationColor}`} onClick={this.showFull}>
                        <div className="user--place--small">
                            {place}
                        </div>
                        <Col xs={{ span: 4, offset: 2 }}>
                            <div className="user--info">
                                <div className="user--info--item">
                                    {player}
                                </div>
                            </div>
                        </Col>
                        <Col xs={{ span: 2, offset: 4 }}>
                            <div className="result-wrap">
                                <div className={`result-border  ${nationColor}`}>
                                    {result}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        )
    }
}
export default UserCard;