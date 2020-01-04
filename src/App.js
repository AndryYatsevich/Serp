import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';
import {Container, Row, Col, Button, Modal, Form} from 'react-bootstrap';
import {Icon} from 'antd';
import UserCard from './Conteiners/UserCard';


class App extends React.Component  {

  constructor(props) {
    super(props);

    this.showModalAddPlayer = this.showModalAddPlayer.bind(this);
    this.closeModalAddPlayer = this.closeModalAddPlayer.bind(this);

    this.state = {
      showModalAdd: false,
      resultGame: [],
      nations: [
        {
          name: "Север",
          checked: false
        },
        {
          name: "Саксония",
          checked: false
        },
        {
          name: "Руссвет",
          checked: false
        },
        {
          name: "Поляния",
          checked: false
        },
        {
          name: "Крым",
          checked: false
        },
        {
          name: "Альбион",
          checked: false
        },
        {
          name: "Тогава",
          checked: false
        },
        {
          name: "Фенрис",
          checked: false
        },
        {
          name: "Весна",
          checked: false
        },
      ],
      tablets: [
        {
          name: "Патриотический",
          checked: false
        },
        {
          name: "Строительный",
          checked: false
        },
        {
          name: "Инновационный",
          checked: false
        },
        {
          name: "Военный",
          checked: false
        },
        {
          name: "Фермерский",
          checked: false
        },
        {
          name: "Технический",
          checked: false
        },
        {
          name: "Промышленный",
          checked: false
        },
      ]
    };
  }

  resultСalculationStars = () => {
    if(this.state.loyalty < 7) {
      const result = this.state.playerStars * 3;
      this.setState({
        resultStars: result
      });
    } else if(this.state.loyalty < 13) {
      const result = this.state.playerStars * 4;
      this.setState({
        resultStars: result
      });
    } else {
      const result = this.state.playerStars * 5;
      this.setState({
        resultStars: result
      });
    }
  }

  resultСalculationFields = () => {
    if(this.state.loyalty < 7) {
      const result = this.state.playerFields * 2;
      this.setState({
        resultFields: result
      });
    } else if(this.state.loyalty < 13) {
      const result = this.state.playerFields * 3;
      this.setState({
        resultFields: result
      });
    } else {
      const result = this.state.playerFields * 4;
      this.setState({
        resultFields: result
      });
    }
  }

  resultСalculationResourses = () => {
    const count = Math.floor(this.state.playerResourses/2);
    if(this.state.loyalty < 7) {      
      const result = count * 1;
      this.setState({
        resultResourses: result
      });
    } else if(this.state.loyalty < 13) {
      const result = count * 2;
      this.setState({
        resultResourses: result
      });
    } else {
      const result = count * 3;
      this.setState({
        resultResourses: result
      });
    }
  }

  sortPlayers = (player1, player2) => {
    if (player1.result > player2.result) return -1;
    if (player1.result < player2.result) return 1;
  }

  addPlayer = () => {
    const {tablets, nations} = this.state;
    let resultPlayer = +this.state.playerMoney + +this.state.playerBonus + +this.state.resultResourses +
    +this.state.resultFields + +this.state.resultStars;
    let player = {};
    player['player'] = this.state.playerName;
    player['loyalty'] = this.state.loyalty;
    player['star'] = this.state.playerStars;
    player['fields'] = this.state.playerFields;
    player['resources'] = this.state.playerResourses;
    player['bonus'] = this.state.playerBonus;
    player['money'] = this.state.playerMoney;
    player['result'] = resultPlayer;
    player['nation'] = this.state.nation;
    player['tablet'] = this.state.tablet;
    let resultGame = [];
    if (this.state.resultGame.length >= 1) {
      for (let i = 0; i < this.state.resultGame.length; i++) {
        resultGame.push(this.state.resultGame[i]);
      }
    }

    for (let i = 0; i < nations.length; i++) {
      if (nations[i].name === this.state.nation) {
        nations[i].checked = true;
      }
    }

    for (let i = 0; i < tablets.length; i++) {
      if (tablets[i].name === this.state.tablet) {
        tablets[i].checked = true;
      }
    }

    resultGame.push(player);

    resultGame.sort(this.sortPlayers);

    for (let i = 0; i <= this.state.resultGame.length; i++) {
      resultGame[i]['place'] = i + 1;
    }

    this.setState({
      resultGame: resultGame,
      tablets: tablets,
      nations: nations
    })
    this.closeModalAddPlayer();
  }

  showModalAddPlayer = () => {
    this.setState({
      showModalAdd: true
    })
  }

  closeModalAddPlayer = () => {
    this.setState({
      showModalAdd: false,
      playerName: false,
      loyalty: false,
      playerStars: false,
      playerFields: false,
      playerResourses: false,
      playerBonus: false,
      playerMoney: false,
      resultResourses: false,
      resultFields: false,
      resultStars: false,
      nation: false,
      tablet: false
    })
  }

  changeFields = (e, field) => {
    this.setState({
      [field]: e.target.value
    })
  }

  changeNation =(e) => {
    this.setState({
      nation: e.target.value
    })
  }

  changeTablet = (e) => {
    this.setState({
      tablet: e.target.value
    })
  }

  renderUserCard = (array) => (array && array.map(item => {
    return <UserCard user={item} />
  })
  )

  renderOption = (item) => {
    return (!item.checked && <option>{item.name}</option>)
  }

  renderModalBody = () => {
    const {tablets, nations} = this.state;
    return (
      <Form>
        <Form.Group as={Row} controlId="playerName">
          <Form.Label column xs="3">
            Игрок
          </Form.Label>
          <Col xs="9">
            <Form.Control onChange={(e) => this.changeFields(e, 'playerName')} type="text"/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
          <Form.Label column xs="3">Нация</Form.Label>
          <Col xs="9">
            <Form.Control as="select" onChange={(e) => this.changeNation(e)}>
              <option></option>
              {nations.map(item => this.renderOption(item))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
          <Form.Label column xs="3">Планшет</Form.Label>
          <Col xs="9">
            <Form.Control as="select" onChange={(e) => this.changeTablet(e)}>
              <option></option>
              {tablets.map(item => this.renderOption(item))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="playerName">
          <Form.Label column xs="3">
            Лояльность
          </Form.Label>
          <Col xs="4">
            <Form.Control onChange={(e) => this.changeFields(e, 'loyalty')} type="text"/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="playerName">
          <Form.Label column xs="3">
            Звезды
          </Form.Label>
          <Col xs="4">
            <Form.Control
              disabled={this.state.loyalty ? false : true}
              onChange={(e) => this.changeFields(e, 'playerStars')}
              onBlur={this.resultСalculationStars}
              type="text"/>
          </Col>
          <Col xs="4">
            {this.state.resultStars && this.state.resultStars}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="playerName">
          <Form.Label column xs="3">
            Территории
          </Form.Label>
          <Col xs="4">
            <Form.Control
              disabled={this.state.loyalty ? false : true}
              onChange={(e) => this.changeFields(e, 'playerFields')}
              onBlur={this.resultСalculationFields}
              type="text"/>
          </Col>
          <Col xs="4">
            {this.state.resultFields && this.state.resultFields}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="playerName">
          <Form.Label column xs="3">
            Ресурсы
          </Form.Label>
          <Col xs="4">
            <Form.Control
              disabled={this.state.loyalty ? false : true}
              onChange={(e) => this.changeFields(e, 'playerResourses')}
              onBlur={this.resultСalculationResourses}
              type="text"/>
          </Col>
          <Col xs="4">
            {this.state.resultResourses && this.state.resultResourses}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="playerName">
          <Form.Label column xs="3">
            Бонусы
          </Form.Label>
          <Col xs="4">
            <Form.Control onChange={(e) => this.changeFields(e, 'playerBonus')} type="text"/>
          </Col>
          <Col xs="4">
            {this.state.playerBonus && this.state.playerBonus}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="playerName">
          <Form.Label column xs="3">
            Монеты
          </Form.Label>
          <Col xs="4">
            <Form.Control onChange={(e) => this.changeFields(e, 'playerMoney')} type="text"/>
          </Col>
          <Col xs="4">
            {this.state.playerMoney && this.state.playerMoney}
          </Col>
        </Form.Group>
      </Form>
    )
  }

  render () {
    console.log('===>', this.state);
    return (
      <Container className="App">
        <Modal show={this.state.showModalAdd} onHide={this.closeModalAddPlayer}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить игрока</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.renderModalBody()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModalAddPlayer}>
              Отмена
            </Button>
            <Button variant="primary" onClick={this.addPlayer}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
        {this.renderUserCard(this.state.resultGame)}
        {
          this.state.resultGame.length < 7 && (
            <Row >
              <Col xs={12}>
                <div className="add-button--wrap">
                  <div className="add-button btn-size" onClick={this.showModalAddPlayer}>
                    <Icon type="plus-circle" />
                  </div>
                </div>
              </Col>
            </Row>
          )
        }
        
      </Container>
    );
  }
}

export default App;
